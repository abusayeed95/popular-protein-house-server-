const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const fileUpload = require("express-fileupload");
const fs = require("fs-extra");
const ObjectId = require("mongodb").ObjectId;

const { DB_USER, DB_PASS, DB_NAME, PORT } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@pph.ppqdc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

client.connect((err) => {
  const productsCollection = client.db(DB_NAME).collection("products");

  //ROOT

  app.get("/", (req, res) => {
    res.send(
      "This is the server-side for popular protein house... visit our site at http://popular-protein-house.netlify.app"
    );
  });

  //Products

  app.get("/products", (req, res) => {
    productsCollection.find({}).toArray((err, collection) => {
      res.send(collection);
      if (err) {
        console.log(err);
      }
    });
  });

  app.post("/products", (req, res) => {
    productsCollection
      .insertMany(fakeProducts)
      .then((result) => {
        if (result.insertedCount > 0) {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  console.log(err ? err : "Server is Running");
});

app.listen(PORT || 8080);
