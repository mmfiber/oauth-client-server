class AuthStore {
  private _accessToken : any = {}
  private _clientId    : string = ""
  private _clientSecret: string = ""
  private _scope       : string[] = [""]

  get accessToken() {
    return this._accessToken
  }
  get clientId() {
    return this._clientId
  }
  get clientSecret() {
    return this._clientSecret
  }
  get scope() {
    return this._scope
  }
  get scopeString() {
    return this._scope.join(" ")
  }

  public setAccessToken(accessToken: any) {
    this._accessToken = accessToken
  }
  public setClientId(clientId: string) {
    this._clientId = clientId
  }
  public setClientSecret(clientSecret: string) {
    this._clientSecret = clientSecret
  }
  public setScope(scope: string[]) {
    this._scope = scope
  }
}

export default new AuthStore()