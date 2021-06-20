import AuthController from "./authController"
import OauthController from "./auth/oauthController"

export default {
  AuthController: new AuthController(),
  OauthController: new OauthController(),
}