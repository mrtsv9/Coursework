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
    console.log("Fetching all types of accessories")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM types_of_accessories"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for types of accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const positions = rows.map((row) => {
        return {
            typeOfAccessoryId: row.type_of_accessory_id,
          type: row.type
        }
      })
  
      console.log("I think we fetched types of accessories successfully")
      res.json(positions)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `types_of_accessories` (name) VALUES (?)"
    getConnection().query(queryString, [req.body.type], (err, results, fields) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching types of types of accessories with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `types_of_accessories` WHERE type_of_accessory_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for types of accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched types of accessories successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    
    const queryString = "UPDATE `types_of_accessories` SET type = ? WHERE type_of_accessory_id = ?"
    getConnection().query(queryString, [req.body.type, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `types_of_accessories` WHERE type_of_accessory_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(console)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;