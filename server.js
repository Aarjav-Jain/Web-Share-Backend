const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

const filesRouter = require("./routes/files");

app.use("/api/files", filesRouter);

app.get("/", (req, res) => {
  res.send("default route");
});

// app.get("*", (req, res) => {
//   res.send("unknown route");
// });

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
