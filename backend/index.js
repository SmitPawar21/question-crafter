const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const routesHandler = require('./router/routesHandler');

const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.use('/', routesHandler);

app.listen(5000, () =>{
    console.log("App listening on 5000 port");
})