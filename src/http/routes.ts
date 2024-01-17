import { FastifyInstance } from "fastify";
import { authController } from "./controllers/auth-controller";
import { createUserController } from "./controllers/create-user-controller";

export async function appRoutes(app: FastifyInstance){
    app.post('/auth', authController)
    app.post('/register', createUserController )
} 