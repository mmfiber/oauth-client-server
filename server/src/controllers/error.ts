
import { Response } from "express"
import { logger } from "../middlewares/logger"
import { ServerError } from "../types/models"

export default class ErrorController {
  public static async json (res: Response, err: ServerError | Error) {
    const error = err instanceof ServerError ? err : new ServerError("server error", 500)
    logger.error(error)
    res.status(error.statusCode).json({ error })
  }
}