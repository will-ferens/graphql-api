const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload.js')
const Subscription = require('./resolvers/Subscriptions')
const Feed = require('./resolvers/Feed')

const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')



const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/willferens/database/dev',
            secret: 'poopypoopybuttholes69',
            debug: true
        })
    })
})

server.start(() => console.log('Server is running on http://localhost:4000'))