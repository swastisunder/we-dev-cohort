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

export { register };
