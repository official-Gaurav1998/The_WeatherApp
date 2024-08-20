const searchButton = document.querySelector('#btn-search');
const cityTemperature = document.querySelector('.temperature');
const tempImg = document.querySelector('.weather-icon');
const cityName = document.querySelector('.city');
const humidityValue = document.querySelector('.humidity');
const windValue = document.querySelector('.wind');

//const express = require('express');
require('dotenv').config();

//Server part - not using
// const app = express();
// const port = process.env.PORT;
// app.listen(port,() =>{
//     console.log(`Starting server at ${port} || 3000`)
// });
// app.use(express.static('public'));
// app.use(express.json({limit:'1mb'}));

//EventListner - Click Event
searchButton.addEventListener('click', function(){
    const userInput = document.querySelector('#input').value;
    getTemperature(userInput);

})

//first way to use this api uisng async await - old way
async function getTemperature(city){
    try{
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
        const apiKey = process.env.API_KEY;
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if(response.status == 404)
        {
            document.querySelector('.error').style.display = "block"
            document.querySelector('.weather').style.display = "none"
        }else{
            const data = await response.json();

            cityTemperature.innerHTML = `${Math.round(data.main.temp)}°c`;
            cityName.innerHTML = data.name;
            humidityValue.innerHTML = `${data.main.humidity}%`;
            windValue.innerHTML = `${data.wind.speed} km/h`;

            //call image changer function -  which will change image according to temperature
            const imagePath = changeTemperatureImage(data.weather[0].main);
            tempImg.src = imagePath;

            //Only display details after search button
            document.querySelector('.weather').style.display = "block"
            document.querySelector('.error').style.display = "none"
        }
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

/*second way to use this api uisng promises/fetch - new way
// fetch(apiUrl + `&appid=${apiKey}`)
// .then((response) =>{
//     return response.json()
// })
// .then((data) =>{
//     console.log(data)
// })
// .catch((error) =>
// {
//     console.log(`Error: ${error}`)
// })
*/

//function for temperature images
function changeTemperatureImage(weather){
    let imgPath = ""
    switch(weather)
    {
        case "Clouds":
            imgPath = "images/cloudy.png"
            break;
        case "Clear":
            imgPath = "images/clear.png"
            break;
        case "Rain":
            imgPath = "images/rainy.png"
            break;
        case "Snow":
            imgPath = "images/snow.png"
            break;
        case "Drizzle":
            imgPath = "images/drizzle.png"
            break;
        case "Mist":
            imgPath = "images/mist.png"
            break;
        default:
            imgPath = "images/cloudy.png"
            break;
    }
    return imgPath;
}