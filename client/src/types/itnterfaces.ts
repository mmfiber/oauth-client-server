import { OauthResponseType } from "./types"

export interface ClientQuery {
  response_type: OauthResponseType
  client_id: string
  redirect_uri: string
  scope: string
  state: string
}