import joi from "joi";
import { User } from "protocols/auth-protocols";

export const authSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});
