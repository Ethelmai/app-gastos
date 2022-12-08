const express = require("express");
const bodyParser = require("body-parser");

const gastosRouter = require("./routes/gastos-router");

const app = express();

app.use(bodyParser.json());
app.use(gastosRouter);

app.use("/gastos", gastosRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
