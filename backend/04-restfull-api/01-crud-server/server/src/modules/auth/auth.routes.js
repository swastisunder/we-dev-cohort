import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import authMiddleware from "./auth.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from "./dto/auth.dto.js";
import {
  forgotPassword,
  login,
  refreshToken,
  register,
  resetPassword,
  updatePassword,
} from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validate(RegisterDto), register);
authRouter.post("/login", validate(LoginDto), login);
authRouter.post("/refresh-token", validate(RefreshTokenDto), refreshToken);
authRouter.post(
  "/forgot-password",
  validate(ForgotPasswordDto),
  forgotPassword,
);
authRouter.post(
  "/update-password",
  validate(UpdatePasswordDto),
  updatePassword,
);
authRouter.post(
  "/reset-password",
  authMiddleware,
  validate(ResetPasswordDto),
  resetPassword,
);

export default authRouter;
