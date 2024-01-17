import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { createUserFactory } from "../../use-cases/facotry/create-user-factory";
const userZodSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()

}).superRefine(({confirmPassword,password}, ctx) =>{
    if(confirmPassword !== password){
        ctx.addIssue({
            code: 'custom',
            message: "Passwords different!"
        })
    }
})


export async function createUserController(request: FastifyRequest, reply: FastifyReply){


    const {name,email,username,password,confirmPassword} = userZodSchema.parse(request.body)

    try{
        const factory =  createUserFactory()

        const createUser = await factory.execute({
            name,
            username,
            email,
            password
        })

        if(!createUser){
           await  reply.status(400).send("Error to create user")
        }
        await reply.status(201).send("Created!")

    }catch(err){
        await reply.status(500).send("Error on server")
    }

}