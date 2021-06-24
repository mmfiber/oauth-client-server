
import { Request, Response } from "express"
import { oauthCallbackUrl } from "../../utils"
import Oauth from "../../businessLogic/oauth"
import store from "../../store"

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

    const accessToken = await this.oauth.getAccessToken(req.query.code)
    if(!accessToken) res.render("auth/index", { error: "bad oauth parameter" })

    res.render("auth/index", { auth: store.auth })
  }
}