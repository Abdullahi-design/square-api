const  dotenv = require ('dotenv');
const cors = require ('cors');
const express = require ("express");
const { router: paymentRoute } = require("../src/router/paymentRoute");

dotenv.config()
const PORT = process.env.PORT
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", paymentRoute)

//Cors Configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept Authorization"
    );
  if (req.method == "OPTIONS" || req.method == "POST") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.listen(PORT);
console.log(`Running on port: ${PORT}`);