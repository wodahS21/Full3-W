const sql = require('mssql');


const config = {
    user: 'yael',
    password: 'qwerty123',
    database: 'api',
    server: '127.0.0.1:1433',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    },
}
module.exports = async function(req, res, next) {
    try {
      await sql.connect(sqlConfig);
      next();
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      res.status(500).send('Error de servidor');
    }
  };