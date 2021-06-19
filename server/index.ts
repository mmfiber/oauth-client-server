import express from "express"
import { expressLogger } from "./src/middlewares/logger"

const app = express()
const port = 9001

app.use(expressLogger)

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})