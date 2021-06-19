import express from "express"
import Controllers from "../src/controllers"

const router = express.Router()

// /auth/oauth
router.get("/auth/oauth/authorize", Controllers.AuthorizeController.index)

export default router