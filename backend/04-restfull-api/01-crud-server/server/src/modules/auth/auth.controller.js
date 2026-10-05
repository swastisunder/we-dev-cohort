import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/apiResponse.js";

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    return ApiResponse.created(res, "User registered successfully", user);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return ApiResponse.ok(res, "Login successful", result);
  } catch (error) {
    return next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);
    return ApiResponse.ok(res, "Token refreshed successfully", result);
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const resetToken = await authService.forgotPassword(req.body.email);
    return ApiResponse.ok(res, "Password reset token generated", {
      resetToken,
    });
  } catch (error) {
    return next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const result = await authService.updatePassword(
      req.body.token,
      req.body.newPassword,
    );
    return ApiResponse.ok(res, result.message, result);
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(
      req.user.id,
      req.body.oldPassword,
      req.body.newPassword,
    );
    return ApiResponse.ok(res, result.message, result);
  } catch (error) {
    return next(error);
  }
};

export {
  register,
  login,
  refreshToken,
  forgotPassword,
  updatePassword,
  resetPassword,
};
