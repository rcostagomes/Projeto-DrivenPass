import { not_Found_Error } from "errors/notFount-error";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "protocols/auth-protocols";
import authService from "../service/auth-service";

export async function signUp(req: Request, res: Response) {
  const { email, password } = res.locals.user as User;

  try {
    await authService.signUp({ email, password });
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);

    if(err.name === "ConflictError"){
      return res.status(409).send(err)
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as User;
  try{
    const result = await authService.signIn(email, password)
    return res.status(httpStatus.OK).send(result)
  } catch(err) {
    console.log(err)
    if(err.name === "NOT_FOUND"){
    return res.status(httpStatus.NOT_FOUND).send(err)
    }
    
    if(err.name === "ConflictError" ){
      return res.status(httpStatus.UNAUTHORIZED).send(err)
    }
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
}

const authController = {
  signIn,
  signUp,
};

export default authController;
