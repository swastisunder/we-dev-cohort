import User from "./auth.model.js";
import ApiError from "../../common/utils/apiError.js";
import { compare, hash } from "bcryptjs";
import { HASH_PASSWORD_SALT } from "../../common/config/envConfig.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyResetToken,
} from "../../common/utils/jwtUtils.js";

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

const normalizeEmail = (email) => email.trim().toLowerCase();

const register = async ({ firstName, lastName, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  const hashedPassword = await hash(password, HASH_PASSWORD_SALT);
  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const responseUser = user.toObject();
  delete responseUser.password;
  delete responseUser.refreshToken;
  delete responseUser.resetPasswordToken;
  delete responseUser.verificationToken;
  return responseUser;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    email: normalizeEmail(email),
    isActive: true,
    isDeleted: false,
  }).select("+password +refreshToken");

  if (!user || !(await compare(password, user.password))) {
    throw ApiError.unauthorized(INVALID_CREDENTIALS_MESSAGE);
  }

  const payload = { id: user._id.toString(), email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = await hash(refreshToken, HASH_PASSWORD_SALT);
  await user.save();

  const responseUser = user.toObject();
  delete responseUser.password;
  delete responseUser.refreshToken;
  return { user: responseUser, accessToken, refreshToken };
};

const refreshToken = async (token) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const user = await User.findOne({
    _id: decoded.id,
    isActive: true,
    isDeleted: false,
  }).select("+refreshToken");

  if (!user || !user.refreshToken || !(await compare(token, user.refreshToken))) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const payload = { id: user._id.toString(), email: user.email };
  const accessToken = generateAccessToken(payload);
  const nextRefreshToken = generateRefreshToken(payload);
  user.refreshToken = await hash(nextRefreshToken, HASH_PASSWORD_SALT);
  await user.save();

  return { accessToken, refreshToken: nextRefreshToken };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({
    email: normalizeEmail(email),
    isActive: true,
    isDeleted: false,
  }).select("+resetPasswordToken +resetPasswordTokenExpire");

  if (!user) throw ApiError.notFound("User not found");

  const resetToken = generateResetToken({
    id: user._id.toString(),
    email: user.email,
  });
  const decodedToken = verifyResetToken(resetToken);
  user.resetPasswordToken = await hash(resetToken, HASH_PASSWORD_SALT);
  user.resetPasswordTokenExpire = new Date(decodedToken.exp * 1000);
  await user.save();

  return resetToken;
};

const updatePassword = async (token, newPassword) => {
  let decoded;
  try {
    decoded = verifyResetToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired reset token");
  }

  const user = await User.findOne({
    _id: decoded.id,
    isActive: true,
    isDeleted: false,
  }).select("+resetPasswordToken +resetPasswordTokenExpire +refreshToken");

  if (!user) throw ApiError.notFound("User not found");
  if (
    !user.resetPasswordToken ||
    !user.resetPasswordTokenExpire ||
    user.resetPasswordTokenExpire <= new Date() ||
    !(await compare(token, user.resetPasswordToken))
  ) {
    throw ApiError.unauthorized("Invalid or expired reset token");
  }

  user.password = await hash(newPassword, HASH_PASSWORD_SALT);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  user.refreshToken = undefined;
  await user.save();

  return { message: "Password updated successfully" };
};

const resetPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findOne({
    _id: userId,
    isActive: true,
    isDeleted: false,
  }).select("+password +refreshToken");

  if (!user) throw ApiError.notFound("User not found");
  if (!(await compare(oldPassword, user.password))) {
    throw ApiError.unauthorized("Invalid old password");
  }

  user.password = await hash(newPassword, HASH_PASSWORD_SALT);
  user.refreshToken = undefined;
  await user.save();

  return { message: "Password updated successfully" };
};

export {
  register,
  login,
  refreshToken,
  forgotPassword,
  updatePassword,
  resetPassword,
};
