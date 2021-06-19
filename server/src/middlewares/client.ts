import { Request, Response, NextFunction } from "express"
import { ClientCredentials } from "../types/interfaces"

export function parseClientCredentials(req: Request, _: Response, next: NextFunction ) {
  const auth = req.headers["authorization"]
  if(!auth) return next()

  let credentials: ClientCredentials = {}
  const [type, code] = auth.split(" ")
  if(type.toLowerCase() === "basic") {
    const decoded = decodeClientCredentials(auth)
    credentials = decoded
  }
  if(type.toLowerCase() === "bearer") {
    credentials = { accessToken: code }
  }

  req.clientCredentials = credentials
  next()
}

function decodeClientCredentials(auth: string) {
  const credentials = Buffer.from(auth.slice("basic ".length), "base64").toString().split(":")
  return { id: credentials[0] || "", secret: credentials[1] || ""}
}