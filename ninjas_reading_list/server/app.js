const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Connection to db and start server
mongoose
    .connect(
      `mongodb+srv://ninja:${process.env.MONGO_PASSWORD}@gql-ninja.srffk.mongodb.net/gql-ninja?retryWrites=true&w=majority`
    )
    .then(result => {
        app.listen(process.env.PORT || 4000);
        console.log('##################################');
        console.log('MongoDB Connected...');
        console.log('Server Connected...');
        console.log('##################################');
    })
    .catch(err =>{
        console.log(err)
    });



