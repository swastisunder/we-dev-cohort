import User from "./auth.model.js";
import ApiError from "../../common/utils/apiError.js";

const register = async ({ firstName, lastName, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    password,
  });

  const responseUser = user.toObject();
  delete responseUser.password;

  return responseUser;
};

export { register };
