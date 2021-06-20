
import { Request, Response } from "express"
import qs from "querystring"
import crypto from "crypto"
import store from "src/store"
import { currentHost } from "src/utils"

export default class AuthorizeController {
  public index (req: Request, res: Response) {
    const state = crypto.randomBytes(8).toString('hex')
    const redirectUri = currentHost(req) + "/auth/oauth/callback"
    const queryItem = {
      response_type: "code" as const,
      client_id: process.env.CLIENT_ID || "",
      scope: "scope",
      redirect_uri: redirectUri,
      state,
    }

    store.auth.setClientQuery(queryItem)

    const query = qs.stringify(queryItem)
    const url = process.env.AUTHORIZATION_ENDPOINT + "?" + query
    res.redirect(url)
  }
}