const mongoose = require('mongoose');
const config = require('./../config/config');

const connectdb = async () => {
  const dbConnection = await mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbCluster}/${config.dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  return dbConnection;
}

module.exports = connectdb;
