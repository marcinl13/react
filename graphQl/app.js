const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const Event = require('./models/event')

const app = express()
app.use(bodyParser.json())

var events = []

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
          events: [Event!]!
        }

        type RootMutation{
          createEvent(eventInput:EventInput):Event
        }
        
        schema{
          query:RootQuery
          mutation:RootMutation
        }`
    ),
    rootValue: {
      events: () => { return events },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          data: args.eventInput.data
        });
        event.save()
          .then(result => {
            console.log(result)
            return {...result._doc}
          })
          .catch(error => { 
            console.log(error) 
          })

      }
    }, graphiql: true
  })
)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-agxbj.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
  .then(
    () => { app.listen(5000) }
  ).catch((error) => { console.log(error) })




