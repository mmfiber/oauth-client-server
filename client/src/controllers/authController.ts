
import { Request, Response } from "express"
import { oauthAuthorizeUrl } from "../utils"

export default class AuthController {
  public index (req: Request, res: Response) {
    res.render("auth/index", { oauthAuthorizeUrl: oauthAuthorizeUrl(req) })
  }
}