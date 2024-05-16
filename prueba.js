
const apikey =  require("./apiData");

let characterId = 10;
const enlace = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${apiKey}`
fetch(enlace)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))