const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=132b10251fec9bbaf9f1e56eb3a228f2&q=India&units=metric"

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p>The weather is currently" + desc + "<p>");
            res.write("<h1>The temperature in India is " + temp + " degrees Celcius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();

            // console.log(desc);

            // const object = {
            //     name:"Rupali",
            //     favFood: "Chole-Bhature"
            // }
            // console.log(JSON.stringify(object));
        })
    })

    // res.send("Server is up and running.")

})


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})