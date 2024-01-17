import bcrypt from 'bcrypt'
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface CreateUserRequest{
    name: string;
    username: string;
    email:string;
    password: string;
}

type CreateUserResponse = User

export class CreateUser {
    constructor(private userRepository: UserRepository){}

    async execute({name,email,username,password}: CreateUserRequest): Promise<CreateUserResponse>{
        
        const verifyAccount = await this.userRepository.findByEmail(email)

        if(verifyAccount){
            throw new Error("Account exists yet!")
        }

        //hash pass
        const hash = await bcrypt.genSalt(4)
        const passwordHash = await bcrypt.hash(password,hash)

        const register = await this.userRepository.create({
            name,
            username,
            email,
            password
        })

        if(!register){
            throw new Error("Error to register user!")
        }

        return register
    }
}