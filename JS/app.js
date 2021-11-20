const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const clientRoutes = require('./routes/clients')
const orderRoutes = require('./routes/orders')
const positionRoutes = require('./routes/positions')
const employeeRoutes = require('./routes/employees')
// const assembliesRoutes = require('./routes/assemblies')
const pcRoutes = require('./routes/pc')
const accessoriesRoutes = require('./routes/accessories')
// const assemblyAccessoriesRoutes = require('./routes/assembly_accessories')
const pc_accessories = require('./routes/pc_accessories')

// types of accessories, payment methods, delivery methods are filled locally in database

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('./public'))

app.use('/clients', clientRoutes)
app.use('/orders', orderRoutes)
app.use('/positions', positionRoutes)
app.use('/employees', employeeRoutes)
// app.use('/assemblies', assembliesRoutes)
app.use('/pc', pcRoutes)
app.use('/accessories', accessoriesRoutes)
// app.use('/assembly-accessories', assemblyAccessoriesRoutes)
app.use('/pc-accessories', pc_accessories)


app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
  })
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
  })
  
