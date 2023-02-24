import { Credential } from "protocols/credential-protocols";
import credentialRepository from "../repository/credential-repository";
import Cryptr from "cryptr";
import { invalidRequest } from "../errors/invalidRequest-error";
import { conflictError } from "../errors/conflict-error";
import { titleExist } from "../errors/titleExist-error";
const cryptr = new Cryptr(process.env.CRYPTR);

export async function createCredential(credential: Credential) {
  const { url, username, password, title, userId } = credential;
  try {
    await credentialExist(title, userId);

    const encryptedPassword = await encryptPassword(password);
    await credentialRepository.createCredential({
      url,
      username,
      title,
      encryptedPassword,
      userId,
    });
  } catch (err) {
    throw conflictError();
  }
}

export async function credentialExist(title: string, userId: number) {
  const userCredential = await credentialRepository.credentialById(userId);
  const checkTitle = userCredential.filter(
    (credential) => credential.title === title
  );

  if (checkTitle.length === 1) {
    throw titleExist();
  }
}
async function encryptPassword(password: string) {
  const encryptedPassword = cryptr.encrypt(password);

  return encryptedPassword;
}

export async function crendentialById(userId: number) {
  const credentialUser = await credentialRepository.credentialById(userId);
  const newCredential = credentialUser.map((credential) => {
    return {
      ...credential,
      password: cryptr.decrypt(credential.password),
    };
  });

  return newCredential;
}

export async function findCredential(id: number, userId: number) {
  const credential = await credentialRepository.UserIsValid(id);
  if (credential.userId !== userId) {
    throw invalidRequest();
  }

  const newPass = cryptr.decrypt(credential.password);

  const { title, username } = credential;
  const credentialInfo = {
    id: credential.id,
    title: title,
    username: username,
    password: newPass,
    userId: credential.userId,
  };

  return credentialInfo;
}

async function deletCredential(id: number, userId: number) {
  const credential = await credentialRepository.UserIsValid(id);
  if (credential.userId !== userId) {
    throw invalidRequest();
  }

  await credentialRepository.deletCredential(id);
}

const credentialService = {
  createCredential,
  credentialExist,
  crendentialById,
  findCredential,
  deletCredential,
};

export default credentialService;
