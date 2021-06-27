const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

const query = req.body.location;
const apiKey = "";
const units = "imperial"
const url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + query + "&appid="+ apiKey + "&units=" + units + "";

https.get(url, function(response){
  console.log(response.statusCode);
  response.on("data", function(data){
    const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const description = weatherData.weather[0].description;
const icon = weatherData.weather[0].icon;    
const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
res.set("Content-Type", "text/html; charset=utf-8"); 
  //res.write("<p> The Weather is currently " + description + "</p>");
 res.write("<h3>The temprature in " + query + " is " + temp + "</h3>");
 });

 });

});

app.listen(8080, function(){
  console.log("Server is running on port 8080");
});
