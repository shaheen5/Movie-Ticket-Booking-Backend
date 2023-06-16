const { Sequelize, Model, DataTypes } = require("sequelize");

const hostName = process.env.HOST;
const userName = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DB;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect: dialect,
    operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000
    }
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
module.exports = { sq: sequelize, dbConnection };
