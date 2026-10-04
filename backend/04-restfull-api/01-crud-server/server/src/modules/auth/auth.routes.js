import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import { register } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validate(RegisterDto), register);

export default authRouter;
