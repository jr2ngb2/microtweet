const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const { ApolloServer } = require('apollo-server-express');
const { graphqlHTTP  } = require('express-graphql');
const graphql = require('graphql');
const User = require("./models").User;
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("./models");



connectToDatabase();

app.use(cors());
app.get("/", async (req, res) => {
  try {
    const user = await User.findById(1);
    const response = { message: `Th response came from the node.js app. User ${user.username} is on the database.` };
    res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});

const server = new ApolloServer({typeDefs , resolvers , context : {models}});
server.applyMiddleware({app});
console.log("haha");
// const QueryRoot = new graphql.GraphQLObjectType({
//   name: 'Query',
//   fields: () => ({
//     hello: {
//       type: graphql.GraphQLString,
//       resolve: () => "Hello world!"
//     }
//   })
// });
// const schema = new graphql.GraphQLSchema({ query: QueryRoot });
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true,
// }));
//app.listen(4000);
// const server = new ApolloServer({
//     modules: [
//         require('./GraphQL/tickets1'),
//         require('./GraphQL/status1'),
//         require('./GraphQL/users1'),
//         require('./GraphQL/priorities1'),
//     ],
// });
//server.applyMiddleware({ app });
app.listen(5000, () => console.log("The node.js app is listening on port 5000."));

function connectToDatabase() {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      //console.log("haha");
      //Check if database was seeded already, and do it if needed
      User.findById(1).then(user => {
        if (!user) {
          console.log("Database is not seeded, will run seeds now...");
          const { exec } = require("child_process");
          try {
            exec("/opt/node_modules/.bin/sequelize db:seed:all", (err, stdout, stderr) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(stdout);
            });
          } catch (error) {
            console.log("Error while seeding database: ", error);
          }
        } else {
          console.log("Database already seeded.");
        }
      });
    })
    .catch(err => {
      console.log("Unable to connect to the database:", err);
    });
 sequelize.sync();
}
