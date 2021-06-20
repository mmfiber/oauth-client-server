
import { Request, Response } from "express"
import Oauth from "src/businessLogic/oauth"
import { AuthorizeQuery } from "src/types/models"
import { urlBuilder } from "src/utils"

export default class AuthorizeController {
  public index (req: Request, res: Response, ) {
    const auth = new Oauth()
    const query = new AuthorizeQuery(req.query)
    auth.setAuthorizeQuery(query)

    if(!auth.verifyClientCredentials()) {
      return res.status(400).json({ message: "Invalid client credentials" })
    }
    if(!auth.redirectUri) {
      return res.status(400).json({ message: "Invalid client credentials" })
    }

    const code = auth.generateCode()
    const url = urlBuilder(auth.redirectUri, { code })
    res.redirect(url)
  }
}