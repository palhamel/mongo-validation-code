import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// Database setup:
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/mongo-validation-codealong";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Mongoose model setup:

const Person = mongoose.model("Person", {
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  height: {
    type: Number,
    required: true,
    min: 5,
  },
  birthdate: {
    type: Date,
    default: Date.now,
  },
});
/* 
Person.deleteMany().then(() => {
  // new Person({ name: 'Anders', height: 170 }).save()
})
 */
// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello man!");
});

// POST Person
// Create using our Person model, auto validate when save(), async await, store in savedPerson and send back result to client
// Test in Postman
// Handling errors via try/catch

app.post('/people', async (req, res) => {
  try {
    const person = await new Person(req.body).save();
    res.json(person);
  } catch (err) {
    res.json({ message: "Could not save person", errors: err.errors });

  }
})





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
