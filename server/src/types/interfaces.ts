export interface ClientCredentials {
  id?: string
  secret?: string
  accessToken?: string
}

export interface AuthorizeQuery {
  response_type: string
  client_id: string
  redirect_uri: string
  scope: string
  state: string
}