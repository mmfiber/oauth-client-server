import express from "express"

import router from "./src/router" 

const app = express()
const port = 9000

app.use(router)

app.set("views", "./src/views")
app.set("view engine", "pug")

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})