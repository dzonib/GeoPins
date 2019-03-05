const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')


const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(e => console.log(e))


const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen().then(({url}) => console.log(`Server running on ${url}`))