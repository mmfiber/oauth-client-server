import { Request } from "express"

export const currentHost = (req: Request) => req.protocol + '://' + req.get('Host')
export const oauthAuthorizeUrl = (req: Request) => currentHost(req) + "/auth/oauth/authorize"
export const oauthCallbackUrl = (req: Request) => currentHost(req) + "/auth/oauth/callback"