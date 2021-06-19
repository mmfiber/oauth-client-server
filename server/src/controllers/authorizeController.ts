
import { Request, Response } from "express"

export default class AuthorizeController {
  public index (req: Request, res: Response) {
    console.log(req)
    res.json({"message": "hello world"})
  }
}