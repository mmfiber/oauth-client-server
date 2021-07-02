
import { Request, Response } from "express"
import Oauth from "../../../businessLogic/oauth"
import { AuthorizeQuery } from "../../../types/models"

export default class AuthorizeController {
  private oauth: Oauth
  
  readonly authorizeQueryProps = [
    "clientId",
    "scope" ,
    "state",
    "redirectUri",
    "responseType"
  ]

  public async authorize (req: Request, res: Response, ) {
    const query = new AuthorizeQuery(req.query)
    if(!query.isDefined(this.authorizeQueryProps)) {
      return res.status(400).json({ message: `Invalid query` })
    }

    this.oauth = new Oauth(query)

    const client = await this.oauth.getClient()
    if(!client) {
      return res.status(400).json({ message: "Client not found" })
    }

    const code = await this.oauth.generateCode()
    if(!code) {
      return res.status(400).json({ message: "Failed to create authrization code" })
    }

    const url = this.oauth.buildRedirectUri("code", "state")
    res.redirect(url)
  }

  public async token (req: Request, res: Response) {
    if(!this.oauth.verifyClientCredentials(req.clientCredentials)) {
      res.status(400).json({ message: "Invalid client credentials" })
    }

    // const query = new AuthorizeQuery(req.query)
    const accessToken = await this.oauth.generateAccessToken({code: req.body.code})
    if(!accessToken) {
      res.status(400).json({ message: "Failed to create access token" })
    }
    res.status(200).json({ accessToken })
  }
}