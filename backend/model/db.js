const mysql=require('mysql2')
require('dotenv').config()


const con=mysql.createConnection({
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_database
})

con.connect(()=>{
    console.log('db connected')
})

module.exports=con