import express from "express"
import Controllers from "../src/controllers"

const router = express.Router()

// /auth/oauth
router.get("/auth/oauth/authorize", Controllers.AuthorizeController.authorize)
router.post("/auth/oauth/token", Controllers.AuthorizeController.token)

export default router