const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
  });

app.post("/",(req,res)=>{
  query= req.body.city;
  apikey= ""/*use your own API Key*/;
  unit = "metric"
  url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",(data)=>{
      const WeatherData = JSON.parse(data);
      const temp = parseInt(WeatherData.main.temp);
      const icon = WeatherData.weather[0].icon;
      const desc = WeatherData.weather[0].description;
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p style='font-family:sans-serif;margin:0.1rem;'>Weather is currently " + desc + "</p>");
      res.write("<h1 style='font-family:sans-serif;margin:0;'>Temparature in "+query+" is currently " + Math.round(temp) + "<sup><sup>o</sup>C</sup> </h1>");
      res.write("<img src="+imgURL+">");
      res.send();
    });
  });
});
app.listen(3000,()=>{
  console.log("Server started on 3000");
});
