const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const { findOrCreateUser } = require('./controllers/userController.js')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(e => console.log(e))


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        let authToken = null
        let currentUser = null
        
        try {
            authToken = req.headers.authorization

            if (authToken) {
                // find or create user
                currentUser = await findOrCreateUser(authToken)
            }
        } catch(e) {
            console.log(`Unable to authenticate user with token ${authToken}`)
        }

        return { currentUser }
    }
})


server.listen().then(({url}) => console.log(`Server running on ${url}`))