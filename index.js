const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
console.log(process.env.PORT);

app.use(express.json());

const blog = require('./routes/blog')

//mount
app.use('/v1',blog)

require('./config/database').dbconnect();

app.listen(PORT, () => {
  console.log(`App is runnig on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This is my home page</h1>`);
});
