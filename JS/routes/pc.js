const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pc_workshop'
})

function getConnection() {
    return pool
}

router.get("/", (req,res) => {
    console.log("Fetching all pc's")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM pc    JOIN orders ON orders.order_id = pc.order_id    JOIN employees ON employees.employees_id = pc.employees_id   JOIN assemblies ON assemblies.assembly_id = pc.assembly_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for pc's: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const pc = rows.map((row) => {
        return {
          pcId: row.pc_id,
          orderId: row.order_id,
          order: {
            orderId: row.order_id,
            address: row.address,
            clientId: row.clients_client_id,
            clients: {
              clientId: row.client_id,
              firstName: row.first_name,
              lastName: row.last_name,
              email: row.email,
              phoneNumber: row.phone_number
            },
            paymentMethodsId: row.payment_methods_id,
            payment_methods: {
              paymentMethodsId: row.payment_methods_id
            },
            deliveryMethodsId: row.delivery_methods_id,
            delivery_methods: {
              deliveryMethodsId: row.delivery_methods_id,
              deliveryType: row.delivery_type
            }
          },
          employeesId: row.employees_id,
          employee: {
            employeesId: row.employees_id,
            firstName: row.first_name,
            lastName: row.last_name,
            middleName: row.middle_name,
            address: row.address,
            phoneNumber: row.phone_number,
            email: row.email,
            positionsId: row.positions_positions_id,
            position: {
              positionsId: row.positions_positions_id,
              name: row.name
            }
          },
          assemblyId: row.assembly_id,
          assembly: {
            assemblyId: row.assembly_id,
            name: row.name
          }
        }
      })
  
      console.log("I think we fetched pc's successfully")
      res.json(pc)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `pc` (order_id, employees_id, assembly_id) VALUES (?, ?, ?)"
    getConnection().query(queryString, [req.body.order_id,  req.body.employees_id, req.body.assembly_id], (err, results, fields) => {
      if (err) {    
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching pc with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `pc` WHERE pc_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for pc: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched pc successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `pc` SET order_id = ?, employees_id = ?, assembly_id = ? WHERE pc_id = ?"
    getConnection().query(queryString, [req.body.order_id, req.body.employees_id, req.body.assembly_id, req.params.id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.delete("/delete/:id", (req, res) =>{
    const connection = getConnection()

    const queryString = "DELETE FROM `pc` WHERE pc_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;