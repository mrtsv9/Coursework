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
    console.log("Fetching all assemblies")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM assemblies"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for assemblies: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const assemblies = rows.map((row) => {
        return {
          assemblyId: row.assembly_id,
          name: row.name
        }
      })
  
      console.log("I think we fetched assemblies successfully")
      res.json(assemblies)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `assemblies` (name) VALUES (?)"
    getConnection().query(queryString, [req.body.name], (err, results, fields) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching assemblies with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `assemblies` WHERE assembly_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for assemblies: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched assemblies successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
    
    const queryString = "UPDATE `assemblies` SET name = ? WHERE assembly_id = ?"
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

    const queryString = "DELETE FROM `assemblies` WHERE assembly_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;