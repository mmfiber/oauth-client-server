import { logger } from "src/middlewares/logger"
import { Code } from "../entities/code"
import rs from "randomstring"

export default class CodeModel {
  static async create() {
    try {
      const code = new Code()
      code.value = rs.generate(16)
      await code.save()
      return code
    } catch(e) {
      logger.error(e)
      return null
    }
  }
}