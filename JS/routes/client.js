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

router.get("/clients", (req,res) => {
    console.log("Fetching all clients")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM clients"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for clients: " + error)
        res.sendStatus(500)
        res.end()
      }
      
    //   const workers = rows.map((row) => {
    //     return {
    //       workerId: row.id,
    //       firstName: row.first_name,
    //       lastName: row.last_name,
    //       dateOfBirth: row.date_of_birth,
    //       email: row.email,
    //       positionId: row.position_id
    //     }
    //   })
  
      console.log("I think we fetched clients successfully")
      res.json(rows)
    })
  })








  module.exports = router;