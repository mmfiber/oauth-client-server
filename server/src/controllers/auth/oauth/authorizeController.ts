
import { Request, Response } from "express"
import Oauth from "../../../businessLogic/oauth"
import { AuthorizeQuery } from "../../../types/models"

export default class AuthorizeController {
  private oauth: Oauth

  public async authorize (req: Request, res: Response, ) {
    const query = new AuthorizeQuery(req.query)
    if(!query.validate()) {
      return res.status(400).json({ message: `Invalid query: ${query.errorMsgs}` })
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

  public token (req: Request, res: Response) {
    if(!this.oauth.verifyClientCredentials(req.clientCredentials)) {
      return res.status(400).json({ message: "Invalid client credentials" })
    }
    // const auth = new Oauth()
    // const accessToken = auth.generateAccessToken(
    //   req.body.grant_type,
    //   { code: req.body.code }
    // )
    res.status(200).json({ accessToken: "hoge" })
  }
}