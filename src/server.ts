import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./http/routes";
const app = Fastify()

app.register(cors, {
    origin: 'http://127.0.0.1:8080', // Permitir apenas as solicitações deste URL
    methods: ['GET', 'PUT', 'POST', 'DELETE'] // Métodos permitidos
  })
  
app.register(appRoutes)

app.listen({
    port:3333,
    host:'0.0.0.0'
}).then(() =>{
    console.log("Server is Running on :3333")
})