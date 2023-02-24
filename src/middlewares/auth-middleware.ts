import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import authRepository from "../repository/auth-repository";
import { not_Found_User } from "../errors/notFoundUser-error";
import httpStatus from "http-status";

 async function hasToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const UserExist = await authRepository.findByUser(userId);

    if (!UserExist) {
      throw not_Found_User();
    }
    res.locals.user = userId;
  } catch {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Token Inválido" });
  }

  next();
}

 const auth = {
  hasToken
}


export default auth