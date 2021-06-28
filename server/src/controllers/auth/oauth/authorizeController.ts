
import { Request, Response } from "express"
import Oauth from "../../../businessLogic/oauth"
import { AuthorizeQuery } from "../../../types/models"

export default class AuthorizeController {
  public async authorize (req: Request, res: Response, ) {
    const query = new AuthorizeQuery(req.query)
    if(!query.validate()) {
      return res.status(400).json({ message: `Invalid query: ${query.errorMsgs}` })
    }

    const auth = new Oauth(query)

    const client = await auth.getClient()
    if(!client) {
      return res.status(400).json({ message: "Client not found" })
    }

    const code = await auth.generateCode()
    if(!code) {
      return res.status(400).json({ message: "Failed to create authrization code" })
    }

    const url = auth.buildRedirectUri("code", "state")
    res.redirect(url)
  }

  public token (req: Request, res: Response) {
    console.log("token", req)
    console.log(req.clientCredentials)
    // const auth = new Oauth()
    // const accessToken = auth.generateAccessToken(
    //   req.body.grant_type,
    //   { code: req.body.code }
    // )
    res.status(200).json({ accessToken: "hoge" })
  }
}