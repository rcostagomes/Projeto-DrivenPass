import prisma from "../config/db/database";
import { WifiEncrypted } from "../protocols/wifi-protocols";

export async function createWifi(wifi:WifiEncrypted) {
    const {title,network,encryptedPassword,userId} = wifi
    
    await prisma.network.create({
        data:{
            title:title,
            network:network,
            password:encryptedPassword,
            userId:userId
        }
    })
}
export async function wifiById(userId: number) {
    const wifi = await prisma.network.findMany({
      where: {
        userId,
      },
    });
  
    return wifi;
  }

export async function getUserWifi(userId: number) {
    const UserWifi = await prisma.network.findMany({
      where: {
        userId,
      },
    });
  
    return UserWifi;
  }

  export async function UserIsValid(id:number) {
    const user = await prisma.network.findFirst({
      where:{
        id:id
      }
    })
    return user
  }

  export async function deletWifi(id:number) {
    const delet = await prisma.network.delete({
      where: {
        id: id,
      },
    });
  
    return delet;
  }

const wifiRepository = {
    createWifi,
    getUserWifi,
    wifiById,
    UserIsValid,
    deletWifi,
}

export default wifiRepository;