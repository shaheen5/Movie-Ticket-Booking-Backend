const express = require('express');
require('dotenv').config();
const { Sequelize, Model, DataTypes } = require("sequelize");

//create express app
const app = express();

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const {dbConnection}=require("./config/db.config");
dbConnection();

//define a simple route
app.get('/',(req,res)=>{
    res.json({"message" : "Welcome To Employee Payroll Application"});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${process.env.PORT}`);
});

module.exports = app;