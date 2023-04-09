import dotenv from 'dotenv'

type Config = {
  port: number
}

dotenv.config()

export const config: Config = {
  port: Number(process.env.PORT) || 8080,
}
