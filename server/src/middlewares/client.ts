import { Request, Response, NextFunction } from "express"

export function parseClientCredentials(req: Request, _: Response, next: NextFunction ) {
  console.log("middle")
  req.clientCredentials = {}
  const auth = req.headers["authorization"]
  if(!auth) return next()

  const [type, code] = auth.split(" ")
  if(type.toLowerCase() === "basic") {
    req.clientCredentials = decodeClientCredentials(auth)
  }
  if(type.toLowerCase() === "bearer") {
    req.clientCredentials = { accessToken: code }
  }
  next()
}

function decodeClientCredentials(auth: string) {
  const credentials = Buffer.from(auth.slice("basic ".length), "base64").toString().split(":")
  return { id: credentials[0] || "", secret: credentials[1] || ""}
}