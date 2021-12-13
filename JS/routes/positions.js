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
    console.log("Fetching all positions")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM positions ORDER BY position_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for positions: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const positions = rows.map((row) => {
        return {
          positionId: row.position_id,
          name: row.name
        }
      })
  
      console.log("I think we fetched positions successfully")
      res.json(positions)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `positions` (name) VALUES (?)"
    getConnection().query(queryString, [req.body.name], (err, results, fields) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching positions with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `positions` WHERE position_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for positions: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched positions successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
    
    const queryString = "UPDATE `positions` SET name = ? WHERE position_id = ?"
    getConnection().query(queryString, [req.body.name, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `positions` WHERE position_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(console)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;