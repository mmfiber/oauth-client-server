// import { logger } from "../middlewares/logger"
// import { Request } from "express"
// import { ClientCredentials } from "../types/interfaces"
import { AuthorizeQuery } from "src/types/models"

type GenerateAccessTokenOptions = {
  code?: string
}
type Client = {
  id?: string
  secret?: string
}

export default class Oauth {
  private client: Client = {}
  private _state: string | null = null
  private _redirectUri: string | null = null
 
  // constructor(query: Request["query"]) {
  //   // fetch client with id and secret from model and verify credentials in model
  //   logger.debug("query: ", query)
  //   this.client = {
  //     id: credentials?.id,
  //     secret: credentials?.secret
  //     redirectUri: credentials?.redir
  //   } 
  // }

  get state() {
    return this._state
  }
  get redirectUri() {
    return this._redirectUri
  }

  public setAuthorizeQuery(q: AuthorizeQuery) {
    this._state = q.state
    this._redirectUri = q.redirectUri
  }

  public verifyClientCredentials() {
    return this.client !== null
  }

  public generateCode() {
    if(!this.verifyClientCredentials) throw new Error(`Invalid client credentials`)
    // generate code logic here
    const code = "code"
    return code
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