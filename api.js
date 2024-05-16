let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let superContainer = document.getElementById("superheroList")

let date = new Date();

console.log(date.getTime());

function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.lenght < 4) {
        return false;
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&nameStartsWith=${input.value}`

    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        let word = "<b>" + name.substr(0, input.value.lenght) + "</b>";
        //word += name.substr(input.value.lenght);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);

    });
})

button.addEventListener("click", (getResult = async () => {
    if (input.value.trim().lenght < 1) {
        alert("Debes ingresar un valor")
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    console.log(response)
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
        showContainer.innerHTML = `<div 
        class="card-container">
        <div class="container-character-image">
        <img src="${element.thumbnail["path"] + "." + element.
                thumbnail["extension"]
            }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });

    //Aqui esta el apartado para imprimir la lista de comics
    let characterId = jsonData.data["results"]["0"]["id"];
    console.log(characterId);

    superContainer.innerHTML = ""
    const enlaceGod = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?format=comic&apikey=${apikey}&ts=${timestamp}&hash=${hashValue}`
    
    const response1 = await fetch(enlaceGod);
    //console.log(response1)
    fetch(url)
        .then(response=>response.json())
        .then(datos=>console.log(datos))

    const jsonData1 = await response1.json();

    //Aqui se imprime una sola vez el titulo "Comics" y el nombre del superheroe 
    superContainer.innerHTML = `
    <br>    
    <h2>Comics</h2>
        <div class="character-name">${jsonData.data.results["0"].name}</div>
    `;

    // Iterar sobre cada elemento en results y mostrar el character-description
    jsonData1.data["results"].forEach((element) => {
    superContainer.innerHTML += `
        <div class="character-description">°w° ${element.title}</div>
    `;
});
    

}));

window.onload = () => {
    getResult();
};