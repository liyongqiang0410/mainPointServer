const pool = require("../dbconfig/pool");

let findUserByUname = (obj) => {
  return new Promise((resolve, reject) => { 
    pool.getConnection((err, connect) => {
      if (err) reject(err);
      else {
        let sql = "select Uid,Unickname,Uname,Upassword,UcreationTime,UupdateTime,Utoken from user_tb where Uname=?;";
        connect.query(sql, [obj.Uname], (err, res) => {
          if (err) throw err;
          else resolve(res);
        });
        connect.release();
      }
    });
  })
};
module.exports = {
  findUserByUname
}