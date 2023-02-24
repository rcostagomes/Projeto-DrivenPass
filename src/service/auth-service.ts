import { conflictError } from "../errors/conflict-error";
import { User } from "protocols/auth-protocols";
import authRepository from "../repository/auth-repository";
import bcrypt from "bcrypt";
import { not_Found_Error } from "../errors/notFount-error";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

async function signUp(auth: User) {
  const { email, password } = auth;

  await emailExist(email);

  const hashedPassword = bcrypt.hashSync(password, 12);

  await authRepository.createUser(email, hashedPassword);
}

async function emailExist(email: string) {
  const user = await authRepository.findByEmail(email);

  if (user) {
    throw conflictError();
  }
  return user;
}

async function signIn(email:string, password:string ) {

  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw not_Found_Error();
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    throw conflictError();
  }

  const token = await createSession(user.id);

  return {token};
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
}

const authService = {
  signUp,
  emailExist,
  signIn,
};

export default authService;
