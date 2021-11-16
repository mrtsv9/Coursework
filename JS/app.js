const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const clientRoutes = require('./routes/client')
const paymentMethods = require('./routes/payment')

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('./public'))

app.use('/clients', clientRoutes)
app.use('/', paymentMethods)


app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
  })
  
  const PORT = process.env.PORT || 3000
  // localhost:3003
  app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
  })
  
