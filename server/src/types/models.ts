import { Request } from "express"
import { RequestQuery } from "./types"

export class AuthorizeQuery {
  clientId    : string
  scope       : string[]
  state       : string
  redirectUri : string
  responseType: string

  errorMsgs: string[]

  constructor(obj: Request["query"]) {
    this.errorMsgs = []
    this.setClientId(obj.client_id)
    this.setScope(obj.scope)
    this.setState(obj.state)
    this.setRedirectUri(obj.redirect_uri)
    this.setResponseType(obj.response_type)
  }

  public validate() {
    return this.errorMsgs.length === 0
  }

  private setClientId(clientId: RequestQuery) {
    if(typeof clientId !== "string") { 
      this.errorMsgs.push("client_id is missing")
      return
    }
    this.clientId = clientId
  }
  private setScope(scope: RequestQuery) {
    if(typeof scope !== "string") { 
      this.errorMsgs.push("scope is missing")
      return
    }
    this.scope = scope.split(" ")
  }
  private setState(state: RequestQuery) {
    if(typeof state !== "string") { 
      this.errorMsgs.push("state is missing")
      return
    }
    this.state = state
  }
  private setRedirectUri(redirectUri: RequestQuery) {
    if(typeof redirectUri !== "string") { 
      this.errorMsgs.push("redirect_uri is missing")
      return
    }
    this.redirectUri = redirectUri
  }
  private setResponseType(responseType: RequestQuery) {
    if(typeof responseType !== "string") { 
      this.errorMsgs.push("response_type is missing")
      return
    }
    this.responseType = responseType
  }
}