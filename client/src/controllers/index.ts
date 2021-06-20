import AuthController from "./authController"
import AuthorizeController from "./auth/oauth/authorizeController"

export default {
  AuthController: new AuthController(),
  AuthorizeController: new AuthorizeController(),
}