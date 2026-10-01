import Joi from "joi";

class BaseDto {
  static schema = Joi.object({});

  static validate(data) {
    const { errors, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (errors)
      return { errors: errors.details.map((err) => err.message), value: null };

    return { errors: null, value };
  }
}

export default BaseDto;
