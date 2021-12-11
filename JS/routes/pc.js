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
  
    const queryString = "SELECT * FROM pc"

    // const queryString = "SELECT * FROM pc    JOIN orders ON orders.order_id = pc.order_id   JOIN assembly_types ON assembly_types.assembly_type_id = pc.assembly_type_id    JOIN employees ON employees.employee_id = pc.employee_id"
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
          totalPrice: row.total_price,
          assemblyTypeId: row.assembly_type_id,
          employeeId: row.employee_id
        }
      })
      
      console.log("I think we fetched pc's successfully")
      res.json(pc)
    })
  })

  router.post("/create", (req, res) => {
  
    const queryString = "INSERT INTO `pc` (order_id, total_price, assembly_type_id, employee_id) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.order_id, req.body.total_price, req.body.assembly_type_id,  req.body.employee_id], (err, results, fields) => {
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
  
    const queryString = "UPDATE `pc` SET order_id = ?, total_price = ?,  assembly_type_id = ?, employee_id = ? WHERE pc_id = ?"
    getConnection().query(queryString, [req.body.order_id, req.body.total_price, req.body.assembly_type_id, req.body.employee_id, req.params.id], (err, results, fields) => {
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