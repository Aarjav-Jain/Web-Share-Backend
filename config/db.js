require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_CONNECTION_URL, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed", err));

  // const connection = mongoose.connection;

  // connection
  //   .once("open", () => {
  //     console.log("Database connected");
  //   })
  //   .catch((err) => {
  //     console.log("Connection failed", err);
  //   });
}

module.exports = connectDB;
