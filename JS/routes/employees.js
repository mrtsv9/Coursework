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
    console.log("Fetching all employees")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM employees JOIN positions ON positions.positions_id = employees.position_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for employees: " + error)
        res.sendStatus(500)
        res.end()
      }
     
      const employees = rows.map((row) => {
        return {
          employeesId: row.employees_id,
          firstName: row.first_name,
          lastName: row.last_name,
          middleName: row.middle_name,
          address: row.address,
          phoneNumber: row.phone_number,
          email: row.email,
          positionsId: row.position_id,               
          position: {
            positionsId: row.position_id,
            name: row.name
          }
        }
      })
    
      console.log("I think we fetched employees successfully")
      res.json(employees)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `employees` (first_name, last_name, middle_name, address, phone_number, email, position_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.first_name,  req.body.last_name, req.body.middle_name, req.body.address, req.body.phone_number, req.body.email, req.body.position_id], (err, results, fields) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching employees with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `employees` WHERE employees_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for employees: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched employees successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `employees` SET first_name = ?, last_name = ?, middle_name = ?, address = ?, phone_number = ?, email = ?, position_id = ? WHERE employees_id = ?"
    getConnection().query(queryString, [req.body.first_name,  req.body.last_name, req.body.middle_name, req.body.address, req.body.phone_number, req.body.email, req.body.position_id, req.params.id], (err, results, fields) => {
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
    const queryString = "DELETE FROM `employees` WHERE employees_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()
    })
  })


  module.exports = router;