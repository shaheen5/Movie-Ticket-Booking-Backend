const express = require('express');
require('dotenv').config();
const {logger} = require('./config/logger');
var cors = require('cors')

//create express app
const app = express();
app.use(cors());

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

//using swagger UI 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// Require routes
require('./app/routes/routes')(app);

// Configuring the database
const {dbConnection}=require("./config/db.config");
dbConnection();

//define a simple route
app.get('/',(req,res)=>{
    res.json({"message" : "Welcome To Employee Payroll Application"});
});

app.listen(process.env.PORT,()=>{
    logger.info(`Server is listening at port ${process.env.PORT}`);
});

module.exports = app;