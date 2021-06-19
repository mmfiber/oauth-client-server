import { logger } from "../middlewares/logger"
import { ClientCredentials } from "../types/interfaces"

type GenerateAccessTokenOptions = {
  code?: string
}
type Client = {
  id?: string
  secret?: string
}

export default class Oauth {
  private client: Client

  constructor(credentials: ClientCredentials) {
    // fetch client with id and secret from model and verify credentials in model
    logger.debug("credentials: ", credentials)
    this.client = {
      id: credentials?.id,
      secret: credentials?.secret
    } 
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