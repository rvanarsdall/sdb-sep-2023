// practice.controller.js
// http:localhost:4000/practice
// ! Starting a controller for first time you will need create a variable called router and you will need to export this variable at the end of the file.
const Player = require("../model/player.model");
const router = require("express").Router();

// ? Create the endpoint of localhost:4000/practice/greeting/
// ? Request type: post request
// ? send back a "Good Afternoon"

router.post("/greeting", (req, res) => {
  console.log(req.body);
  res.send("Good Afternoon " + req.body.firstName);
});

// ? Create the endpoint of localhost:4000/practice/weather/
// ? Request type: get request: Change this endpoint to a POST request
// ? send back a "It's sunny and 70 degrees outside"
// TODO: make the degrees dynamic and it be sent the payload.
router.post("/weather", (req, res) => {
  const { currentWeather } = req.body;
  res.send(`It's sunny and ${currentWeather} degrees outside`);
});

router.post("/player", (req, res) => {
  const { name, age } = req.body;
  Player.create({ name, age });
  res.send(Player.data);
});

// ? Create an endpoint of localhost:4000/practice/add
// ? request type: post
// send back to the client: The total of the two numbers are ____
// the payload should look like "{ "num1": 6, "num2": 5}"

module.exports = router;
