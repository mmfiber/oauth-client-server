import { Request } from "express"
import { RequestQuery } from "./types"

export class AuthorizeQuery {
  clientId    : string
  code        : string
  scope       : string[]
  state       : string
  redirectUri : string
  responseType: string

  constructor(obj: Request["query"]) {
    this.setClientId(obj.client_id)
    this.setCode(obj.code)
    this.setScope(obj.scope)
    this.setState(obj.state)
    this.setRedirectUri(obj.redirect_uri)
    this.setResponseType(obj.response_type)
  }

  public isDefined(props: string[]) {
    let isDefined = true
    props.forEach(prop => {
      if (eval(`this.${prop}`)) return
      isDefined = false
    })
    return isDefined
  }

  private setClientId(clientId: RequestQuery) {
    if(typeof clientId !== "string") return
    this.clientId = clientId
  }
  private setCode(code: RequestQuery) {
    if(typeof code !== "string") return
    this.code = code
  }
  private setScope(scope: RequestQuery) {
    if(typeof scope !== "string") return
    this.scope = scope.split(" ")
  }
  private setState(state: RequestQuery) {
    if(typeof state !== "string") return
    this.state = state
  }
  private setRedirectUri(redirectUri: RequestQuery) {
    if(typeof redirectUri !== "string") return
    this.redirectUri = redirectUri
  }
  private setResponseType(responseType: RequestQuery) {
    if(typeof responseType !== "string") return
    this.responseType = responseType
  }
}