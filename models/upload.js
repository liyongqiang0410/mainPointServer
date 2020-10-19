const pool = require("../dbconfig/pool");

let insertFile = (obj) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) reject(err);
      else {
        let sql = `insert into user_file (UFName, UFTime, UFPath) VALUES (?,?,?);`;
        conn.query(sql, [obj.UFName, obj.UFTime, obj.UFPath], (err, res) => {
          if (err) throw err;
          else resolve(res);
        });
        conn.release();
      }
    });
  });
};
module.exports = {
  insertFile,
};
