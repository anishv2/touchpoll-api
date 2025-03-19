const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { maxPoolSize: 5 }, (error) => {
  if (error) {
    console.log("DATABASE connection error", error);
  } else {
    console.log("DATABASE connected...");
  }
});

module.exports = mongoose;
