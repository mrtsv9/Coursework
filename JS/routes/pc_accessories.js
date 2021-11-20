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
    console.log("Fetching all pc_accessories")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM pc_accessories  JOIN pc ON pc.pc_id= pc_accessories.pc_id   JOIN accessories ON accessories.accessory_id = pc_accessories.accessory_id"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for pc_accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const pc_accessories = rows.map((row) => {
        return {
          pcId: row.pc_id,
          pc: {
          pcId: row.pc_id,
          orderId: row.order_id,
          order: {
            orderId: row.order_id,
            address: row.address,
            clientId: row.client_id,
            clients: {
              clientId: row.client_id,
              firstName: row.first_name,
              lastName: row.last_name,
              email: row.email,
              phoneNumber: row.phone_number
            },
            paymentMethodsId: row.payment_methods_id,
            payment_methods: {
              paymentMethodsId: row.payment_methods_id
            },
            deliveryMethodsId: row.delivery_methods_id,
            delivery_methods: {
              deliveryMethodsId: row.delivery_methods_id,
              deliveryType: row.delivery_type
            } 
          },
          assemblyId: row.assembly_id,
          assembly: {
            assemblyId: row.assembly_id,
            name: row.name
          },
          employeesId: row.employees_id,
          employee: {
            employeesId: row.employees_id,
            firstName: row.first_name,
            lastName: row.last_name,
            middleName: row.middle_name,
            address: row.address,
            phoneNumber: row.phone_number,
            email: row.email,
            positionsId: row.positions_positions_id,
            position: {
              positionsId: row.positions_positions_id,
              name: row.name
            }
          }
          },
          accessoryId: row.accessory_id,
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
  
      console.log("I think we fetched pc_accessories successfully")
      res.json(pc_accessories)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
  
    const queryString = "INSERT INTO `pc_accessories` (pc_id, accessory_id) VALUES (?, ?)"
    getConnection().query(queryString, [req.body.pc_id, req.body.accessories_id], (err, results, fields) => {
      if (err) {    
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching pc_accessories with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `pc_accessories` WHERE pc_accessories_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for pc_accessories: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched pc_accessories successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `pc_accessories` SET pc_id = ?, accessory_id = ? WHERE pc_accessories_id = ?"
    getConnection().query(queryString, [req.body.pc_id, req.body.accessory_id, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `pc_accessories` WHERE pc_accessories_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;