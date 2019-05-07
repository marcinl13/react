const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
app.use(bodyParser.json())

app.use(
  '/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event{
          _id: ID!
          title: String!
          description: String!
          price: Float!
          data: String!
        }

        input EventInput{
          title: String!
          description: String!
          price: Float!
          data: String!
        }

        type RootQuery {
          events: [String!]!
        }

        type RootMutation{
          createEvent(eventEvent:EventInput):String
        }
        
        schema{
          query:RootQuery
          mutation:RootMutation
        }`
    ),
    rootValue: {
      events: () => { return ['asd', 'asdasd'] },
      createEvent: (args) => {
        const events = {
          _id: Math.random().toString(),
          title: args.title,
          description: args.description,
          price: args.price,
          data: args.data
        }
      }
    }, graphiql: true
  })
)


app.listen(5000)