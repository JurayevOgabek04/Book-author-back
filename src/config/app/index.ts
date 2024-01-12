import { registerAs } from "@nestjs/config"

interface AppConfig {
    readonly port: number
    readonly host: string
}

export const appConfig = registerAs('app', (): AppConfig => ({
    port: process.env.App_Port ? Number(process.env.App_Port) : undefined,
    host: process.env.App_Host ? String(process.env.App_Host) : undefined
}))