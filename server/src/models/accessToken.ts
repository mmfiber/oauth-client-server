import { logger } from "src/middlewares/logger"
import { AccessToken } from "../entities/accessToken"
import rs from "randomstring"
import { date } from "src/utils"

export default class AuthorizationCodeModel {
  static async create() {
    try {
      const oneWeekLater = date(7)

      const accessToken = new AccessToken()
      accessToken.token = rs.generate(32)
      accessToken.expiresAt = oneWeekLater
      await accessToken.save()

      return accessToken
    } catch(e) {
      logger.error(e)
      return null
    }
  }
}