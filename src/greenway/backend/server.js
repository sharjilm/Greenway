const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const dbRouter = require("./routes/database");
app.use("/db", dbRouter);

const gasPriceRouter = require("./routes/gasprice");
app.use("/gasprice", gasPriceRouter);

app.listen(3001, () => {
    console.log("Server started on port 3001");
});