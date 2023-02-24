import prisma from "config/db/database";
import { User } from "../../src/protocols/auth-protocols";
import bcrypt from "bcrypt"

export async function create_user(body: User) {
    const hashedPassword = bcrypt.hashSync(body.password, 15)
    return await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword
      },
    });
}