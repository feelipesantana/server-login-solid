import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UserRepository{
    async create ({name,email,username,password}: Prisma.UserCreateInput): Promise<User>{
        const createUser = await prisma.user.create({
            data:{
                name,
                email,
                username,
                password
            }
        })

        return createUser
    }
    async findByEmail(email: string){
        
        const getEmail = await prisma.user.findFirst({
            where:{
                email
            }
        })

        return getEmail 
    }
}