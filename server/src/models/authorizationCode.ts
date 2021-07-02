import { logger } from "src/middlewares/logger"
import { AuthorizationCode } from "../entities/authorizationCode"
import rs from "randomstring"

export default class AuthorizationCodeModel {
  static async findById(id: number) {
    try {
      return await AuthorizationCode.findOne({ id })
    } catch(e) {
      logger.error(e)
      return null
    }
  }

  static async findByCode(code: string) {
    try {
      return await AuthorizationCode.findOne({ code })
    } catch(e) {
      logger.error(e)
      return null
    }
  }

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

  static async delete(id: number) {
    try {
      const code = await this.findById(id)
      if(!code) {
        logger.info(`Try to delete code of id, but not found. Code id: ${id}`)
        return false
      }
      AuthorizationCode.delete({ id: code.id })
      return true
    } catch(e) {
      logger.error(e)
      return false
    }
  }
}