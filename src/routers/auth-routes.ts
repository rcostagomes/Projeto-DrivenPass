import { signUp, signIn } from "../controllers/auth-controller";
import { Router } from "express";
import { authSchema } from "../models/auth-schema";
import validMiddleware from "../middlewares/validate-schema";

const authRouter = Router();

authRouter.post("/signup", validMiddleware.validateSchema(authSchema), signUp);
authRouter.post("/signin",validMiddleware.validateSchema(authSchema), signIn);

export default authRouter;
