import express from "express"

import router from "./src/router" 
import { parseClientCredentials } from "./src/middlewares/client"
import { expressLogger } from "./src/middlewares/logger"

const app = express()
const port = 9001

app.use(router)
app.use(parseClientCredentials)
app.use(expressLogger)

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})