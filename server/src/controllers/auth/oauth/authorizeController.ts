
import { Request, Response } from "express"
import Oauth from "../../../businessLogic/oauth"
import { AuthorizeQuery } from "../../../types/models"
import { urlBuilder } from "../../../utils"

export default class AuthorizeController {
  public authorize (req: Request, res: Response, ) {
    console.log("authorize")
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
    const url = urlBuilder(auth.redirectUri, { code, state: auth.state })
    res.redirect(url)
  }

  public token (req: Request, res: Response) {
    console.log("token", req)
    console.log(req.clientCredentials)
    const auth = new Oauth()
    const accessToken = auth.generateAccessToken(
      req.body.grant_type,
      { code: req.body.code }
    )
    res.status(200).json({ accessToken })
  }
}