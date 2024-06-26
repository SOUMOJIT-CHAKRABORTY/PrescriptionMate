const express = require("express");
const app = express();
const router = require("./routes/docRoutes.js");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
