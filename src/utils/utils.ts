import jwt from "jsonwebtoken"

export const verify = (token: string) => jwt.verify(token, String(process.env.SECRET_KEY))
export const sign = (payload: any) => jwt.sign(payload, String(process.env.SECRET_KEY))