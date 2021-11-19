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
    console.log("Fetching all assembly_accessories")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM assembly_accessories  JOIN assemblies ON assemblies.assembly_id = assembly_accessories.assembly_accessories_id    JOIN accessories ON accessories.accessories_id = assembly_accessories.accessories_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for assembly_accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const assembly_accessories = rows.map((row) => {
        return {
          assemblyAccessoriesId: row.assembly_accessories_id,
          assemblyId: row.assembly_id,
          assembly: {
            assemblyId: row.assembly_id,
            name: row.name
          },
          accessoriesId: row.accessories_id,
          accessory: {
            accessoriesId: row.accessories_id,
            name: row.name,
            properties: row.properties,
            typeOfAccessoriesId: row.types_of_accessories_id,
            typeOfAccessories: {
              typeOfAccessoriesId: row.types_of_accessories_id,
              type: row.type
            }
          }
        }
      })
  
      console.log("I think we fetched assembly_accessories successfully")
      res.json(assembly_accessories)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `assembly_accessories` (assembly_id, accessories_id) VALUES (?, ?)"
    getConnection().query(queryString, [req.body.assembly_id,  req.body.accessories_id], (err, results, fields) => {
      if (err) {    
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching assembly_accessories with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `assembly_accessories` WHERE assembly_accessories_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for assembly_accessories_id: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched assembly_accessories_id successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `assembly_accessories` SET assembly_id = ?, accessories_id = ? WHERE assembly_accessories_id = ?"
    getConnection().query(queryString, [req.body.assembly_id, req.body.accessories_id, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `assembly_accessories` WHERE assembly_accessories_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;