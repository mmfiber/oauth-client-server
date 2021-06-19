
import { Request, Response } from "express"
import { urlBuilder } from "../utils"

export default class AuthorizeController {
  public index (_: Request, res: Response) {
    const url = urlBuilder("http://localhost:9001/", { code: "code" })
    // const url = urlBuilder(req.params.redirect_uri, { code: "code" })
    res.redirect(url)
  }
}