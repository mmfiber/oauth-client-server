
import { Request, Response } from "express"
import { currentHost } from "../utils"

export default class AuthController {
  public index (req: Request, res: Response) {
    const oauthAuthorizeUrl = currentHost(req) + "/auth/oauth/authorize"
    res.render("auth/index", { oauthAuthorizeUrl })
  }
}