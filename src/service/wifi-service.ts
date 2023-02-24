import Cryptr from "cryptr";
import { titleExist } from "../errors/titleExistWifi-error";
import { conflictError } from "../errors/conflict-error";
import { invalidRequest } from "../errors/invalidRequest-error";
import { Wifi } from "../protocols/wifi-protocols";
import wifiRepository from "../repository/wifi-repository";
const cryptr = new Cryptr(process.env.CRYPTR);

export async function createWifi(wifi: Wifi) {
  const { title, network, password, userId } = wifi;

  try {
    await wifiExist(title, userId);
    const encryptedPassword = await encryptPassword(password);
    await wifiRepository.createWifi({
      title,
      network,
      encryptedPassword,
      userId,
    });
  } catch (err) {
    throw err;
  }
}
export async function wifiExist(title: string, userId: number) {
  const userWifi = await wifiRepository.wifiById(userId);
  const checkTitle = userWifi.filter((wifi) => wifi.title === title);

  if (checkTitle.length === 1) {
    throw titleExist();
  }
}

async function encryptPassword(password: string) {
  const encryptedPassword = cryptr.encrypt(password);

  return encryptedPassword;
}

async function getUserWifi(userId: number) {
  const userWifi = await wifiRepository.getUserWifi(userId);
  const newUserWifi = userWifi.map((wifi) => {
    return {
      ...wifi,
      password: cryptr.decrypt(wifi.password),
    };
  });
  return newUserWifi;
}

export async function findWif(id: number, userId: number) {
  const wifi = await wifiRepository.UserIsValid(id);
  if (wifi.userId !== userId) {
    throw invalidRequest();
  }

  const newPass = cryptr.decrypt(wifi.password);

  const { title } = wifi;
  const WifiInfo = {
    id: wifi.id,
    title: title,
    network: wifi.network,
    password: newPass,
    userId: wifi.userId,
  };

  return WifiInfo;
}

async function deletWifi(id: number, userId: number) {
  const wifi = await wifiRepository.UserIsValid(id);
  if (wifi.userId !== userId) {
    throw invalidRequest();
  }

  await wifiRepository.deletWifi(id);
}

const wifiService = {
  createWifi,
  getUserWifi,
  findWif,
  wifiExist,
  deletWifi,
};

export default wifiService;
