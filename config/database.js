const mongoose = require("mongoose");

require("dotenv").config();

exports.dbconnect = () => {

    console.log(process.env.DATABASE_URL);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Conncted Successfully");
    })
    .catch((error) => {
      console.log("DB Connection issue");
      console.log(error);
      process.exit(1);
    });
};
