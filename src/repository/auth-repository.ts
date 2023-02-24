import prisma from "../config/db/database";

async function findByEmail(email: string) {
  const existUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return existUser;
}

async function createUser(email: string, hashPassword: string) {
  await prisma.user.create({
    data: {
      email,
      password: hashPassword,
    },
  });
}

async function findByUser(userData: number) {
  const findUser = await prisma.user.findFirst({
    where: {
      id: userData,
    },
  });

  return findUser;
}
const authRepository = {
  findByEmail,
  createUser,
  findByUser,
};
export default authRepository;
