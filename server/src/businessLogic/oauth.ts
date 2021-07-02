import { Client } from "../entities/client"
import ClientModel from "../models/client"
import { AuthorizationCode } from "../entities/authorizationCode"
import AuthorizationCodeModel from "../models/authorizationCode"
import { AccessToken } from "../entities/accessToken"
import AccessTokenModel from "../models/accessToken"
import { AuthorizeQuery } from "src/types/models"
import { urlBuilder } from "../utils"
import { ClientCredentials } from "src/types/interfaces"
import { logger } from "../middlewares/logger"
import { hash } from "../utils"

export default class Oauth {
  private _accessToken      : AccessToken
  private _authorizationCode: AuthorizationCode
  private _client           : Client
  private _clientId         : string
  // private _scope       : string[]
  private _state            : string
  private _redirectUri      : string
  private _responseType     : string
 
  constructor(query: AuthorizeQuery) {
    this._clientId     = query.clientId
    // this._scope        = query.scope
    this._state        = query.state
    this._redirectUri  = query.redirectUri
    this._responseType = query.responseType
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
    const code = await AuthorizationCodeModel.create()
    if(!code) return null
    this._authorizationCode = code
    return this._authorizationCode
  }

  public async generateAccessToken(options: any) {
    switch(this._responseType) {
      case "authorization_code":
        return await this.generateAccessTokenWithCode(options)
      default:
        logger.error(`Invalid grant type: ${this._responseType}`)
        return null
    }
  }

  private async generateAccessTokenWithCode(options: any) {
    if(!options.code) {
      logger.error("code is not given")
      return null
    }

    const code = await AuthorizationCodeModel.findByCode(options.code)
    if(!code) {
      logger.error("Invalid code")
      return null
    }
    await AuthorizationCodeModel.delete(code.id)
  
    const accessToken = await AccessTokenModel.create()
    if(!accessToken) {
      logger.error("Failed to generate access token")
      return null
    }

    console.log(accessToken)
    this._accessToken = accessToken
    return this._accessToken
  }

  public buildRedirectUri(...options: string[]) {
    const params: any = {}
    if(options.includes("code"))
      params.code = this._authorizationCode.code || undefined
    if(options.includes("state"))
      params.state = this._state
    return urlBuilder(this._redirectUri, params)
  }
}