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
    console.log("Fetching all clients")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM clients"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for clients: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const clients = rows.map((row) => {
        return {
          clientId: row.client_id,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          phoneNumber: row.phone_number
        }
      })
  
      console.log("I think we fetched clients successfully")
      res.json(clients)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `clients` (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching client with id:" + req.params.id)
    const connection = getConnection()

    const clientId = req.params.id
    const queryString = "Select * FROM `clients` WHERE client_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for client: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched clients successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `clients` SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE client_id = ?"
    getConnection().query(queryString, [req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `clients` WHERE client_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;