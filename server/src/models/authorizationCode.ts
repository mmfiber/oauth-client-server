import { logger } from "src/middlewares/logger"
import { AuthorizationCode } from "../entities/authorizationCode"
import rs from "randomstring"

export default class AuthorizationCodeModel {
  static async create() {
    try {
      const authorizationCode = new AuthorizationCode()
      authorizationCode.code = rs.generate(16)
      await authorizationCode.save()
      return authorizationCode
    } catch(e) {
      logger.error(e)
      return null
    }
  }
}