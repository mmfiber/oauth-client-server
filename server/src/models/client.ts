import { logger } from "src/middlewares/logger"
import { Client } from "../entities/client"

export default class ClientModel {
  static async findById(id: string) {
    try {
      return await Client.findOne({id})
    } catch(e) {
      logger.error(e)
      return null
    }
  }
}