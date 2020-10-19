const mysql = require('mysql')
const config = require('../config/index')
// 创建连接池
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let query = (sql, values) => { 
  return new Promise((resolve, reject) => { 
    pool.getConnection((err, connection) => { 
      if (err) {
        reject(err)
      } else { 
        connection.query(sql, values, (err, rows) => { 
          if (err) {
            reject(err)
          } else { 
            resolve(rows)
          }
          // 释放连接
          connection.release()
        })
      }
    }) 
  })
}
module.exports = {
  query
}