import express from "express"
import cors from "cors"
import { createConnection } from "typeorm"

import router from "./src/router" 
import { parseClientCredentials } from "./src/middlewares/client"
import { expressLogger } from "./src/middlewares/logger"

const app = express()
const port = 9001

createConnection()

app.use(cors())
app.use(express.json())// for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(parseClientCredentials)
app.use(expressLogger)
app.use(router)

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})