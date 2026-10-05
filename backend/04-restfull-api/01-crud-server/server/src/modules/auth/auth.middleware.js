import ApiError from "../../common/utils/apiError.js";
import { verifyAccessToken } from "../../common/utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") || [];

  if (scheme !== "Bearer" || !token) {
    return next(ApiError.unauthorized("Bearer access token is required"));
  }

  try {
    req.user = verifyAccessToken(token);
    return next();
  } catch {
    return next(ApiError.unauthorized("Invalid or expired access token"));
  }
};

export default authMiddleware;
