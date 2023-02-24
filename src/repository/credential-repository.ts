import prisma from "../config/db/database";
import { CredentialUser } from "protocols/credential-protocols";

export async function createCredential(credential: CredentialUser) {
  const { userId, title, username, url, encryptedPassword } = credential;
  await prisma.credential.create({
    data:{
      userId:userId,
      title: title,
      username:username,
      url: url,
      password:encryptedPassword
    },
  });
}

export async function credentialById(userId: number) {
  const credential = await prisma.credential.findMany({
    where: {
      userId,
    },
  });

  return credential;
}

export async function findByTitle(title: string) {
  const user = await prisma.credential.findFirst({
    where: {
      title,
    },
  });

  return user;
}

export async function UserIsValid(id:number) {
  const user = await prisma.credential.findFirst({
    where:{
      id:id
    }
  })
  return user
}

async function deletCredential(id: number) {
  const delet = await prisma.credential.delete({
      where: {
          id: id
      }
  })

  return delet
}

const credentialRepository = {
  createCredential,
  credentialById,
  findByTitle,
  UserIsValid,
  deletCredential,
};

export default credentialRepository;
