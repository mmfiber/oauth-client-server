import express from "express"
import dotenv from "dotenv"

import router from "src/router" 
import { expressLogger } from "src/middlewares/logger"

const app = express()
const port = 9000

// set env according to .env
dotenv.config()

// set middlewares
app.use(router)
app.use(expressLogger)

// set view config
app.set("views", "./src/views")
app.set("view engine", "pug")

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})