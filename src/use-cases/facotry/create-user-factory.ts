import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { CreateUser } from "../create-user";

export function createUserFactory(){
    const prismaUserRepository = new PrismaUserRepository()
    const createUser = new CreateUser(prismaUserRepository)

    return createUser
}