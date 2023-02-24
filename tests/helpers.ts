import prisma from "config/db/database";
import * as jwt from "jsonwebtoken";
import {User} from "../src/protocols/auth-protocols"

export async function cleanDb() {
    await prisma.credential.deleteMany({});
    await prisma.network.deleteMany({});
    await prisma.user.deleteMany({});
}

export async function generateValidToken(user: User) {
    const token = await jwt.sign({ userId: Number(user.id) }, process.env.JWT_SECRET);
    return token;
}