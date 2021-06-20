import { Request } from "express"
export class AuthorizeQuery {
  responseType: string | null
  clientId: string | null
  redirectUri: string | null
  scope: string[] | null
  state: string | null

  constructor(obj: Request["query"]) {
    this.responseType = typeof obj.response_type === "string"
      ? obj.response_type
      : null
    this.clientId = typeof obj.client_id === "string"
      ? obj.client_id
      : null
    this.redirectUri = typeof obj.redirect_uri === "string"
      ? obj.redirect_uri
      : null
    this.scope = typeof obj.scope === "string"
      ? obj.scope.split(" ")
      : null
    this.state = typeof obj.state === "string"
      ? obj.state
      : null
  }
}