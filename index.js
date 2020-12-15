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

const fakeProducts = [
  {
    name: "Chicken Vaccine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, hic ratione. Quam quibusdam similique perspiciatis?",
    id: 11,
    price: 300,
    availability: true,
    img:
      "https://zootecnicainternational.com/wp-content/uploads/2020/02/chicks_and_ampule3-New-696x464.jpg",
  },
  {
    name: "Cow Vaccine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, hic ratione. Quam quibusdam similique perspiciatis?",
    id: 22,
    price: 300,
    availability: false,
    img: "https://www.anbvet.co.za/assets/images/cattle%20vaccine.jpg",
  },
  {
    name: "Chicken Medicine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, hic ratione. Quam quibusdam similique perspiciatis?",
    id: 33,
    price: 300,
    availability: true,
    img:
      "https://s3.amazonaws.com/newhobbyfarms.com/chicken_injection_vaccine-600x347.jpg",
  },
  {
    name: "Cow Medicine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, hic ratione. Quam quibusdam similique perspiciatis?",
    id: 44,
    price: 300,
    availability: true,
    img: "https://www.snopes.com/tachyon/2020/03/GettyImages-700711951.jpg",
  },
  {
    name: "Goat Vaccine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, hic ratione. Quam quibusdam similique perspiciatis?",
    id: 55,
    price: 300,
    availability: true,
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcorxTGKF8mjsFWy24t0G84WcD6buXu9GjGg&usqp=CAU",
  },
  {
    name: "Goat Medicine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, hic ratione. Quam quibusdam similique perspiciatis?",
    id: 66,
    price: 300,
    availability: true,
    img:
      "https://i1.wp.com/katiesuescountrylife.com/wp-content/uploads/2020/05/vaccine.png?fit=1024%2C549&ssl=1",
  },
];

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
