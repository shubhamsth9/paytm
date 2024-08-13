const express = require("express");
const { user } = require("./db");
const rootRouter = require("./routes/index");

const app = express();
const PORT = 3000;

app.use("api/v1/", rootRouter);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log("Server listening on port ", PORT);
})