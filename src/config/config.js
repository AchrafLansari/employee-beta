const path = require('path')

const config = {
  dbUser: 'DBUSER',
  dbPassword: 'DBPASSWORD',
  dbName: 'DBNAME',
  dbCluster: 'DBCLUSTER',
  web: {
    port: process.env.PORT || 3000,
    public_location: path.join(__dirname, '..', '/public')
  }
}

module.exports = config;
