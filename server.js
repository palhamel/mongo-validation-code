import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose, { MongooseDocument, Mongoose } from 'mongoose'

// Database setup:
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/mongo-validation-codealong";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Mongoose model setup:

const Person = mongoose.model('Person', {
  
})





// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello man!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
