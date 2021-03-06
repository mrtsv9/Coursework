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
    console.log("Fetching all orders")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM orders JOIN payment_methods ON payment_methods.payment_method_id = orders.payment_method_id   JOIN delivery_methods ON delivery_methods.delivery_method_id = orders.delivery_method_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for orders: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const orders = rows.map((row) => {
        return {
          orderId: row.order_id,
          address: row.address,
          clientId: row.client_id,
          deliveryMethodId: row.delivery_method_id,
          delivery: {
            deliveryMethodId: row.delivery_method_id,
            deliveryType: row.delivery_type
          },
          paymentMethodId: row.payment_method_id,
          payment: {
            paymentMethodId: row.payment_method_id,
            paymentType: row.payment_type
          }
        }
      })
  
      console.log("I think we fetched orders successfully")
      res.json(orders)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `orders` (address, client_id, payment_method_id, delivery_method_id) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.address,  req.body.client_id, req.body.delivery_method_id, req.body.payment_method_id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching orders with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `orders` WHERE order_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for orders: " + error)
        res.sendStatus(500)
        res.end()
      }
    
      console.log("I think we fetched orders successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `orders` SET address = ?, client_id = ?, payment_method_id = ?, delivery_method_id = ? WHERE order_id = ?"
    getConnection().query(queryString, [req.body.address, req.body.client_id, req.body.payment_method_id, req.body.delivery_method_id, req.params.id], (err, results, fields) => {
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

    const orderId = req.params.id
    const queryString = "DELETE FROM `orders` WHERE order_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;