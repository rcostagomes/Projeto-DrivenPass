import prisma from "config/db/database";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
export const cryptr = new Cryptr("myTotallySecretKey");

export async function generateValidCredential(userId:number) {
    const password = cryptr.encrypt(faker.internet.password())
    return prisma.credential.create({
        data: {
            title:faker.name.firstName(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password,
            userId
        }
    })
}