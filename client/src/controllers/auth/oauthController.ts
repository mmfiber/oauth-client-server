
import { Request, Response } from "express"
import qs from "querystring"
import crypto from "crypto"
import store from "src/store"
import { currentHost } from "src/utils"

export default class OauthController {
  public authorize (req: Request, res: Response) {
    const state = crypto.randomBytes(8).toString('hex')
    const redirectUri = currentHost(req) + "/auth/oauth/callback"
    const queryItem = {
      client_id:     process.env.CLIENT_ID || "",
      redirect_uri:  redirectUri,
      response_type: req.params.grant_type,
      scope:         req.params.scope,
      state,
    }

    store.auth.setClientQuery(queryItem)

    const query = qs.stringify(queryItem)
    const url = process.env.AUTHORIZATION_ENDPOINT + "?" + query
    res.redirect(url)
  }

  public callback(req: Request, res: Response) {
    res.json({code: req.query.code, state: req.query.state})
  }
}