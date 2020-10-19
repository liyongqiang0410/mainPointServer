const config = {
  port: process.env.PORT || 3001,
  database: {
    DATABASE: 'koa2database',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  }
}
module.exports = config