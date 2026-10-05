import "dotenv/config";

export const PORT = process.env.PORT || 8080;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/crud";
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_RESET_TOKEN_SECRET =
  process.env.JWT_RESET_TOKEN_SECRET || JWT_ACCESS_TOKEN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRES_IN =
  process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m";
export const JWT_REFRESH_TOKEN_EXPIRES_IN =
  process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d";
export const JWT_RESET_TOKEN_EXPIRES_IN =
  process.env.JWT_RESET_TOKEN_EXPIRES_IN || "15m";
export const HASH_PASSWORD_SALT = parseInt(process.env.HASH_PASSWORD_SALT) || 10;