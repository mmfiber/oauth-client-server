
import { Request, Response } from "express"
import { oauthAuthorizeUrl, oauthCallbackUrl } from "../../utils"
import Oauth from "../../businessLogic/oauth"
import store from "../../store"
import jwt from "jsonwebtoken"

export default class OauthController {
  private oauth: Oauth

  public authorize (req: Request, res: Response) {
    this.oauth = new Oauth()
    this.oauth.redirectUri  = oauthCallbackUrl(req)
    this.oauth.responseType = req.body.response_type
    this.oauth.scope        = req.body.scope

    const url = this.oauth.authorizeUrl()
    if(!url) return res.render("auth/index", { error: "bad oauth parameter" })

    res.redirect(url)
  }

  public async callback(req: Request, res: Response) {
    const validState = this.oauth.veryfyState(req.query.state)
    if(!validState) res.render("auth/index", { error: "Invalid state" })


    const [accessToken, idToken] = await this.oauth.getAuthorizeTokens(req.query.code)
    if(!accessToken) res.render("auth/index", { error: "bad oauth parameter" })
    
    const idTokenDecoded = idToken && process.env.CLIENT_SECRET
      ? jwt.verify(idToken, process.env.CLIENT_SECRET)
      : null

    console.log(idTokenDecoded)

    res.render(
      "auth/index", { 
        auth: store.auth,
        idToken,
        idTokenDecoded,
        oauthAuthorizeUrl: oauthAuthorizeUrl(req)
      })
  }
}