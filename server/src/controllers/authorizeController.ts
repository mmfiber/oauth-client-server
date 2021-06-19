
import { Request, Response } from "express"
import Oauth from "../businessLogic/oauth"
import { urlBuilder } from "../utils"

export default class AuthorizeController {
  public index (req: Request, res: Response) {
    const auth = new Oauth(req.clientCredentials)

    if(!auth.verifyClientCredentials()) {
      res.status(400).json({ message: "Invalid client credentials" })
    }

    const code = auth.generateCode()
    // const url = urlBuilder("http://localhost:9001/", { code })
    const url = urlBuilder(req.params.redirect_uri, { code })
    res.redirect(url)
  }
}