import express from "express"
import Controllers from "../src/controllers"

const router = express.Router()

router.get("/auth", Controllers.AuthController.index)
router.post("/auth/oauth/authorize", Controllers.OauthController.authorize.bind(Controllers.OauthController))
router.get("/auth/oauth/callback", Controllers.OauthController.callback.bind(Controllers.OauthController))

export default router