const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const authMiddleware = require("./middleware");

app.use(express.json());
app.use(cors);
app.use(authMiddleware());

const rootRouter = require("./routes/index");

app.use("api/v1/", rootRouter);


app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log("Server listening on port ", PORT);
})