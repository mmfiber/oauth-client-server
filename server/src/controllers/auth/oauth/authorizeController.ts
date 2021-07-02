
import { Request, Response } from "express"
import ErrorController from "src/controllers/error"
import Oauth from "../../../businessLogic/oauth"
import { AuthorizeQuery } from "../../../types/models"

export default class AuthorizeController {
  private oauth: Oauth

  public async authorize (req: Request, res: Response) {
    try {
      const query = new AuthorizeQuery(req.query)

      this.oauth = new Oauth(query)
      await this.oauth.getClient()
      await this.oauth.generateCode()
  
      const url = this.oauth.buildRedirectUri("code", "state")
      res.redirect(url)
    } catch(e) {
      ErrorController.json(res, e)
    }
  }

  public async token (req: Request, res: Response) {
    try {
      this.oauth.verifyClientCredentials(req.clientCredentials)
      const accessToken = await this.oauth.generateAccessToken({code: req.body.code})
      res.status(200).json({ accessToken })
    } catch(e) {
      ErrorController.json(res, e)
    }
  }
}