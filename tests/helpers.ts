import prisma from "config/db/database";


export async function cleanDb() {
    await prisma.credential.deleteMany({});
    await prisma.network.deleteMany({});
    await prisma.user.deleteMany({});
}

