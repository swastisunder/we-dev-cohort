import {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_RESET_TOKEN_EXPIRES_IN,
  JWT_RESET_TOKEN_SECRET,
} from "../config/envConfig.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  return jwt.sign({ ...payload, tokenType: "access" }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(
    { ...payload, tokenType: "refresh" },
    JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
  );
};

const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
  if (decoded.tokenType !== "access") {
    throw new Error("Invalid access token");
  }
  return decoded;
};

const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
  if (decoded.tokenType !== "refresh") {
    throw new Error("Invalid refresh token");
  }
  return decoded;
};

const generateResetToken = (payload) => {
  return jwt.sign(
    { ...payload, tokenType: "password-reset" },
    JWT_RESET_TOKEN_SECRET,
    { expiresIn: JWT_RESET_TOKEN_EXPIRES_IN },
  );
};

const verifyResetToken = (token) => {
  const decoded = jwt.verify(token, JWT_RESET_TOKEN_SECRET);
  if (decoded.tokenType !== "password-reset") {
    throw new Error("Invalid reset token");
  }
  return decoded;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateResetToken,
  verifyResetToken,
};
