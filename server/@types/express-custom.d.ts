import { ClientCredentials } from "../src/types/interfaces"

declare global {
  namespace Express {
    export interface Request {
      clientCredentials: ClientCredentials
    }
  }
}