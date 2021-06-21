import { ClientQuery } from "../types/itnterfaces"

class AuthStore {
  private _state: string = ""
  private _clientId: string = ""
  private _redirectUri: string = ""
  private _scope: string[] = [""]

  get state() {
    return this._state
  }
  get clietId() {
    return this._clientId
  }
  get redirectUri() {
    return this._redirectUri
  }
  get scope() {
    return this._scope
  }
  get scopeString() {
    return this._scope.join(" ")
  }

  public setClientQuery(q: ClientQuery) {
    if(q.state)
      this.setState(q.state)
    if(q.client_id)
      this.setClientId(q.client_id)
    if(q.redirect_uri)
      this.setRedirectUri(q.redirect_uri)
    if(q.scope)
      this.setScope(q.scope)
  }

  private setState(state: string) {
    this._state = state
  }
  private setClientId(clientId: string) {
    this._clientId = clientId
  }
  private setRedirectUri(redirectUri: string) {
    this._redirectUri = redirectUri
  }
  private setScope(scope: string) {
    this._scope = scope.split(" ")
  }
}

export default new AuthStore()