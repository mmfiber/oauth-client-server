import { Request } from "express"

export const currentHost = (req: Request) => req.protocol + '://' + req.get('Host')