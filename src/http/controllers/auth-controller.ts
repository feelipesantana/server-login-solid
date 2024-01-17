import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { authFactory } from "../../use-cases/facotry/auth-factory";
const zodSchemaAuth = z.object({
    email:z.string(),
    password: z.string(),
})

export async function authController(request: FastifyRequest, reply: FastifyReply){

    const {email,password} = zodSchemaAuth.parse(request.body)

    try{
        const factory =  authFactory()

        const auth = await factory.execute({
            email,
            password
        })

        if(!auth){
            await reply.status(400).send("Error to authentication")
        }
         
        await reply.status(200).send(auth)

    }catch(err){
        await reply.status(500).send("Error on code!")
    }
}