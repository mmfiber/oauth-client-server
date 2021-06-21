
import { Request, Response } from "express"
import qs from "querystring"
import crypto from "crypto"
import axios from "axios"
import store from "../../store"
import { currentHost } from "../../utils"

export default class OauthController {
  public authorize (req: Request, res: Response) {
    const state = crypto.randomBytes(8).toString('hex')
    const redirectUri = currentHost(req) + "/auth/oauth/callback"
    const queryItem = {
      client_id:     process.env.CLIENT_ID || "",
      redirect_uri:  redirectUri,
      response_type: req.params.response_type,
      scope:         req.params.scope,
      state,
    }

    store.auth.setClientQuery(queryItem)

    const query = qs.stringify(queryItem)
    const url = process.env.AUTHORIZATION_ENDPOINT + "?" + query
    res.redirect(url)
  }

  public async callback(req: Request, res: Response) {
    // veryfy state
    if(!req.query.state || store.auth.state !== req.query.state) {
      const error = `Invalid state is given: ${req.query.state}`
      return res.render("auth/index", { error })
    }

    // exchange code to access token
    if(!process.env.TOKEN_ENDPOINT) {
      const error = `Token end point is undefined`
      return res.render("auth/index", { error })
    }
    const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${credentials}`
    }
    const data = {
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: store.auth.redirectUri
    }
    try {
      const response = await axios.post(
        process.env.TOKEN_ENDPOINT,
        data,
        { headers }
      )
      res.json(response.data)
    } catch(e) {
      console.log(e)
    }
  }
}