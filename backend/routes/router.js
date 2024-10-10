const express = require('express');
const router = express.Router();
const db = require('../model/db'); 

router.get('/data',(req,res)=>{
    const sql='SELECT * From employees'
    db.query(sql,(err,result)=>{
        if (err) throw err
        res.send(result)
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




module.exports = router;
