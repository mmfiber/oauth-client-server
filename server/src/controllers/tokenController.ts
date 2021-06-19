
import { Request, Response } from "express"
import logger from "../middlewares/logger"

export default class TokenController {
  public create (req: Request, res: Response) {
    if(req.params.grant_type === "authorization_code")
    res.redirect(url)
  }
}