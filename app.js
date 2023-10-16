require("dotenv").config();
const express = require("express");
const app = express();

const practiceController = require("./controllers/practice.controller");
const playerController = require("./controllers/player.controller");

app.use(express.json()); // THIS WILL ALLOW YOU TO SEND IN YOUR PAYLOAD A JSON OBJECT AND IT WILL PARSE IT FOR US - Middleware

// http://localhost:4000/test
app.get("/test", (req, res) => {
  // req: Request
  // res: Response

  res.send("Hello World");
});
app.use(express.static(`${__dirname}/public`));
app.use("/practice", practiceController);
// http://localhost:4000/player/add
app.use("/player", playerController);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
