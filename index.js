const express = require('express')
const app = express()
const registerRouter = require('./routers/register')
const loginRouter = require('./routers/login')
const port = process.env.port || 4000
var morgan = require('morgan')
app.use(morgan('combined'))
app.use(express.json())
app.use('/auth', registerRouter)
app.use('/auth', loginRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})