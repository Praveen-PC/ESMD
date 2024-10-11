const express = require('express');
const router = express.Router();
const db = require('../model/db'); 

router.get('/data',(req,res)=>{
    const sql='SELECT * From employees'
    db.query(sql,(err,result)=>{
        if (err){
          console.log(error)
          return res.status(500).send('Internal Error')
        } 
         return res.status(200).send(result)
    })
})

router.post('/insert', (req, res) => {
    const { employee_id, employee_name, department, sex, marital_status, salary, address } = req.body;
    const sql = 'INSERT INTO employees (employee_id, employee_name, department, sex, marital_status, salary, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [employee_id, employee_name, department, sex, marital_status, salary, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log(result);
        return res.status(200).send("Data inserted successfully");
    });
});

router.put('/update/:employee_id', (req, res) => {
    const { employee_id } = req.params; 
    const { employee_name, department, sex, marital_status, salary, address } = req.body;
    const sql = 'UPDATE employees SET employee_name=?, department=?, sex=?, marital_status=?, salary=?, address=? WHERE employee_id=?';
    db.query(sql, [employee_name, department, sex, marital_status, salary, address, employee_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error updating employee");
        }
        return res.status(200).send("Updated successfully");
    });
});


router.delete('/deleteuser/:employee_id', (req, res) => {
    const { employee_id } = req.params; 
    const sql = 'DELETE FROM employees WHERE employee_id = ?'; 
    db.query(sql, [employee_id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting user' });
        }
        return res.status(200).json('User data is deleted');
    });
});




module.exports = router;
