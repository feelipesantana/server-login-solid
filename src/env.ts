import z from 'zod'

const envSchema = z.object({
    TOKEN_JWT: z.string()
})

export const env = envSchema.parse(process.env)