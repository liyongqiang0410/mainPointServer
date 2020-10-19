const mysql = require("mysql");
const config = require("./db.js");

let pool = mysql.createPool(config);

module.exports = pool;
