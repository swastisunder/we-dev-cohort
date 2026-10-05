import Joi from "joi";
import BaseDto from "../../../common/dto/baseDto.js";

const emailSchema = Joi.string().trim().lowercase().max(254).email().required();
const passwordSchema = Joi.string().min(4).max(128).required();

class LoginDto extends BaseDto {
  static schema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
  });
}

class RefreshTokenDto extends BaseDto {
  static schema = Joi.object({
    refreshToken: Joi.string().required(),
  });
}

class ForgotPasswordDto extends BaseDto {
  static schema = Joi.object({
    email: emailSchema,
  });
}

class UpdatePasswordDto extends BaseDto {
  static schema = Joi.object({
    token: Joi.string().required(),
    newPassword: passwordSchema,
  });
}

class ResetPasswordDto extends BaseDto {
  static schema = Joi.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
  });
}

export {
  LoginDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  UpdatePasswordDto,
  ResetPasswordDto,
};
