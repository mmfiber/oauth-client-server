import { Request, Response, NextFunction } from "express"

export function parseClientCredentials(req: Request, _: Response, next: NextFunction ) {
  req.clientCredentials = {}
  const auth = req.headers["authorization"]
  if(!auth) return next()

  const [type, credentials] = auth.split(" ")
  switch(type.toLowerCase()) {
    case "basic":
      req.clientCredentials = decodeClientCredentials(credentials)
      break
    case "bearer":
      req.clientCredentials = { accessToken: credentials }
      break
  }
  next()
}

function decodeClientCredentials(decoded: string) {
  const credentials = Buffer.from(decoded, "base64").toString().split(":")
  return { id: credentials[0] || "", secret: credentials[1] || ""}
}