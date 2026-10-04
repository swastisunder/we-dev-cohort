import Joi from "joi";
import BaseDto from "../../../common/dto/baseDto.js";

const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]*$/;

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .pattern(NAME_REGEX)
      .required()
      .messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name cannot exceed 50 characters",
        "string.pattern.base":
          "First name can only contain letters, spaces, hyphens and apostrophes",
        "any.required": "First name is required",
      }),

    lastName: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .pattern(NAME_REGEX)
      .required()
      .messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name cannot exceed 50 characters",
        "string.pattern.base":
          "Last name can only contain letters, spaces, hyphens and apostrophes",
        "any.required": "Last name is required",
      }),

    email: Joi.string()
      .trim()
      .lowercase()
      .max(254)
      .email()
      .required()
      .messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email address",
        "string.max": "Email cannot exceed 254 characters",
        "any.required": "Email is required",
      }),

    password: Joi.string().min(4).max(128).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 4 characters long",
      "string.max": "Password cannot exceed 128 characters",
      "any.required": "Password is required",
    }),
  });
}

export default RegisterDto;
