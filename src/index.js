const express = require('express');
const portfinder = require('portfinder');
const { ApolloServer } = require('apollo-server-express');

const config = require('./config/config');

// Db Connector
const connectDb = require('./controllers/db');

//GraphQl Schema
const graphqlSchema = require('./schemas/employee');


// Appolo Server with Mongoose Compose Schema
const server = new ApolloServer({ schema: graphqlSchema });
const app = express();

//Don't advertise that this is express
app.disable('x-powered-by');

//Deply static files and views
app.use(express.static(config.web.public_location))

server.applyMiddleware({ app });


app.get('/', (req, res, next) => {
  res.sendFile(path.join(config.web.public_location, 'index.html'))
});

(async () => {
  try {
    const dbConnection = await connectDb();
    if (dbConnection)
      app.listen(config.web.port, () => console.log(`Running on :${config.web.port} 👍`));
  } catch (err) {
    console.log('DB error: ' + err)
  }
})()




