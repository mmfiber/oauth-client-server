import { Client } from "../entities/client"
import ClientModel from "../models/client"
import { Code } from "../entities/code"
import CodeModel from "../models/code"
import { AuthorizeQuery } from "src/types/models"
import { urlBuilder } from "../utils"
import { ClientCredentials } from "src/types/interfaces"
import { logger } from "../middlewares/logger"
import { hash } from "../utils"

type GenerateAccessTokenOptions = {
  code?: string
}
export default class Oauth {
  private _client      : Client
  private _clientId    : string
  private _code        : Code
  // private _scope       : string[]
  private _state       : string
  private _redirectUri : string
  // private _responseType: string
 
  constructor(query: AuthorizeQuery) {
    this._clientId     = query.clientId
    // this._scope        = query.scope
    this._state        = query.state
    this._redirectUri  = query.redirectUri
    // this._responseType = query.responseType
  }

  public async getClient() {
    const client = await ClientModel.findById(this._clientId)
    if(!client) return null
    this._client = client
    return this._client
  }

  public verifyClientCredentials(credentials: ClientCredentials) {
    if(!credentials.id || !credentials.secret) {
      logger.error("client credentials are missing")
      return false
    }
    return (
      this._client.id === credentials.id
      && this._client.secret === hash(credentials.secret)
    )
  }

  public async generateCode() {
    const code = await CodeModel.create()
    if(!code) return null
    this._code = code
    return this._code
  }

  public buildRedirectUri(...options: string[]) {
    const params: any = {}
    if(options.includes("code"))
      params.code = this._code.value || undefined
    if(options.includes("state"))
      params.state = this._state
    return urlBuilder(this._redirectUri, params)
  }

  public generateAccessToken(grantType: string, options: GenerateAccessTokenOptions = {}) {
    switch(grantType) {
      case "authorization_code":
        return this.generateAccessTokenWithCode(options)
      default:
        throw new Error(`Invalid grant type: ${grantType}`)
    }
  }

  private generateAccessTokenWithCode(options: GenerateAccessTokenOptions) {
    if(!options.code) throw new Error("code is not given")
    // verify code here
    const accessToken = "accessToken"
    return accessToken
  }
}