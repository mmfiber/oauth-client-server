import { Client } from "../entities/client"
import ClientModel from "../models/client"
import { AuthorizationCode } from "../entities/authorizationCode"
import AuthorizationCodeModel from "../models/authorizationCode"
import { AccessToken } from "../entities/accessToken"
import AccessTokenModel from "../models/accessToken"
import { AuthorizeQuery, ServerError } from "src/types/models"
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

  readonly authorizeQueryProps = [
    "clientId",
    "scope" ,
    "state",
    "redirectUri",
    "responseType"
  ]
 
  constructor(query: AuthorizeQuery) {
    if(!query.isDefined(this.authorizeQueryProps)) {
      throw new ServerError("Invalid query", 500)
    }

    this._clientId     = query.clientId
    // this._scope        = query.scope
    this._state        = query.state
    this._redirectUri  = query.redirectUri
    this._responseType = query.responseType
  }

  public async getClient() {
    const client = await ClientModel.findById(this._clientId)
    if(!client) throw new ServerError("Client not found", 500)
    this._client = client
    return this._client
  }

  public verifyClientCredentials(credentials: ClientCredentials) {
    if(!credentials.id || !credentials.secret) {
      throw new ServerError("client credentials are missing", 500)
    }
    const isValid = (
      this._client.id === credentials.id
      && this._client.secret === hash(credentials.secret)
    )
    if(!isValid) {
      throw new ServerError("Invalid client credentials", 500)
    }
    return isValid
  }

  public async generateCode() {
    const code = await AuthorizationCodeModel.create()
    if(!code) throw new ServerError("Failed to generate authorization code", 500)

    this._authorizationCode = code
    return this._authorizationCode
  }

  public async generateAccessToken(options: any) {
    switch(this._responseType) {
      case "authorization_code":
        return await this.generateAccessTokenWithCode(options)
      default:
        throw new ServerError(`Invalid grant type: ${this._responseType}`, 500)
    }
  }

  private async generateAccessTokenWithCode(options: any) {
    if(!options.code) {
      logger.error("code is not given")
      return null
    }

    const code = await AuthorizationCodeModel.findByCode(options.code)
    if(!code) throw new ServerError("Invalid code", 500)

    await AuthorizationCodeModel.delete(code.id)
  
    const accessToken = await AccessTokenModel.create()
    if(!accessToken) throw new ServerError("Failed to generate access token", 500)

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