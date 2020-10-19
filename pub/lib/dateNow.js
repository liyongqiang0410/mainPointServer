const backNow = () => { 
  let date = new Date();
  let YYYY = date.getFullYear();
  let MM = ("0" + (date.getMonth() + 1)).slice(-2);
  let dd = ("0" + date.getDate()).slice(-2);

  let HH = ("0" + date.getHours()).slice(-2);
  let mm = ("0" + date.getMinutes()).slice(-2);
  let ss = ('0' + date.getSeconds()).slice(-2);
  return (YYYY + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss);
}
module.exports = {
  backNow
}
