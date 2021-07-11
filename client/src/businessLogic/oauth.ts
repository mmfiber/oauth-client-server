import axios from "axios"
import crypto from "crypto"
import qs from "querystring"
import { RequestQuery } from "src/types/types"
import { logger } from "../middlewares/logger"
import store from "../store"

export default class Oauth {
  private _state: string

  public redirectUri : string
  public responseType: string

  constructor() {
    store.auth.setClientId(process.env.CLIENT_ID || "")
    store.auth.setClientSecret(process.env.CLIENT_SECRET || "")
    this._state = crypto.randomBytes(8).toString('hex')
  }

  get accessToken() {
    return store.auth.accessToken
  }
  get client() {
    return {
      id: store.auth.clientId,
      secret: store.auth.clientSecret
    }
  }
  get state() {
    return this._state
  }
  get scope() {
    return store.auth.scope
  }
  set scope(scope: string[]) {
    store.auth.setScope(scope)
  }
  get scopeString() {
    return store.auth.scopeString
  }

  public authorizeUrl() {
    if(!this.redirectUri) {
      logger.error("redirect_uri is missing")
      return null
    }
    if(!this.responseType) {
      logger.error("responseType is missing")
      return null
    }
    if(!this.scope || this.scope.length === 0) {
      logger.error("scope is missing")
      return null
    }

    const queryItem = {
      client_id:     this.client.id,
      redirect_uri:  this.redirectUri,
      response_type: this.responseType,
      scope:         this.scopeString,
      state:         this.state
    }
    const query = qs.stringify(queryItem)
    const url = process.env.AUTHORIZATION_ENDPOINT + "?" + query
    return url
  }

  public veryfyState(state: RequestQuery) {
    if(!state || state !== this.state) {
      logger.error(`Invalid state is given: ${state}`)
      return false
    }
    return true
  }

  public async getAuthorizeTokens(code: RequestQuery): Promise<string[] | null[]> {
    if(!process.env.TOKEN_ENDPOINT) {
      logger.error("Token end point is undefined")
      return [null, null]
    }
    if(!code) {
      logger.error("Authorization code is missing")
      return [null, null]
    }
    if(typeof code !== "string") {
      logger.error(`Authorization code is invalid, ${code}`)
      return [null, null]
    }
    const credentials = Buffer.from(`${this.client.id}:${this.client.secret}`).toString('base64')
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Basic ${credentials}`
    }
    const data = {
      grant_type: "authorization_code",
      redirect_uri: this.redirectUri,
      code
    }
    try {
      const res = await axios.post(process.env.TOKEN_ENDPOINT, data, { headers })
      const accessToken = res.data?.access_token
      const idToken = res.data?.id_token
      store.auth.setAccessToken(accessToken) 
      return [accessToken, idToken]
    } catch(e) {
      logger.error(e)
      return [null, null]
    }
  }
}