import express from "express"
import Controllers from "../src/controllers"

const router = express.Router()

router.get("/auth", Controllers.AuthController.index)
router.get("/auth/oauth/authorize", Controllers.AuthorizeController.index)

export default router