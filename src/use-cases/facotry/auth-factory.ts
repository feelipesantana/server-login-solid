import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { Authentication } from "../authentication";

export function authFactory(){

    const prismaUserRepository = new PrismaUserRepository()
    const auth = new Authentication(prismaUserRepository)

    return auth
}