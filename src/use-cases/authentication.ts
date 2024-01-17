import { User } from "@prisma/client"
import { UserRepository } from "../repositories/user-repository"
import jwt from 'jsonwebtoken'
import { env } from "../env"
interface AuthenticationRequest{
    email: string
    password: string
}

interface AuthenticationResponse{
    token: string
    id: string,
    name: string,
    email:string
}
export class Authentication{
    constructor(private userRepository: UserRepository){}

    async execute({email,password}: AuthenticationRequest): Promise<AuthenticationResponse>{
        //verify email
        const verifyExistsUser = await this.userRepository.findByEmail(email)
        
        if(!verifyExistsUser){
            throw new Error('User not found!')
        }

        //verify pass
        const comparePasswords = verifyExistsUser.password === password

        if(!comparePasswords){
            throw new Error('User not found!')
        }

        //Generate Token jwt

        const token = jwt.sign({
            id: verifyExistsUser.id, name: verifyExistsUser.name, email:verifyExistsUser.email},
            env.TOKEN_JWT,
            {expiresIn: '1d'}
        )
        return {token, id: verifyExistsUser.id, email: verifyExistsUser.email, name: verifyExistsUser.name}

    }
}