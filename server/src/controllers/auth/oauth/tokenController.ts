
import { Request, Response } from "express"
import Oauth from "src/businessLogic/oauth"

export default class TokenController {
  public create (req: Request, res: Response) {
    const auth = new Oauth(req.clientCredentials)
    const accessToken = auth.generateAccessToken(
      req.params.grant_type,
      { code: req.params.code }
    )
    res.status(200).json({ accessToken })
  }
}