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
    console.log("Fetching all accessories")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM accessories    JOIN types_of_accessories ON types_of_accessories.type_of_accessory_id = accessories.type_of_accessory_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const accessories = rows.map((row) => {
        return {
          accessoriesId: row.accessory_id,  
          name: row.name,
          properties: row.properties,
          price: row.price,
          typeOfAccessoriesId: row.type_of_accessory_id,
          typeOfAccessories: {
            typeOfAccessoriesId: row.type_of_accessory_id,
            type: row.type
          }
        }
      })
  
      console.log("I think we fetched accessories successfully")
      res.json(accessories)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `accessories` (name, properties, price, types_of_accessories_id) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.name,  req.body.properties, req.body.price, req.body.types_of_accessories_id], (err, results, fields) => {
      if (err) {    
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching accessories with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `accessories` WHERE accessories_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched accessories successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `accessories` SET name = ?, properties = ?, price = ?, types_of_accessories_id = ? WHERE accessories_id = ?"
    getConnection().query(queryString, [req.body.name, req.body.properties, req.body.price, req.body.types_of_accessories_id, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `accessories` WHERE accessories_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;