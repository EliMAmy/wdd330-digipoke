const MAX_POKEMON = 625;

const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];
fetch(`https://digi-api.com/api/v1/digimon?pageSize=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        allPokemons = data.content;
        displayPokemons(allPokemons);
    });
async function fetchPokemonDataBeforeRedirect(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://digi-api.com/api/v1/digimon/${id}`)
            .then((res) => { return res.json(); }
        ),
        fetch(`https://digi-api.com/api/v1/type/${id}`)
            .then((res) => { res.json() }
        ),
        
        ])
        return true
    } catch (error) {
        console.error("Failed to fetch Pokemon Data before Redirect");
    }
}

export default function displayPokemons(pokemon) {
    listWrapper.innerHTML = "" ;
    
    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.id;
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
        <div class="number-wrap"> 
            <p class="caption-fonts">${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://digi-api.com/images/digimon/w/${pokemon.name.replaceAll(" ","_")}.png" alt="${pokemon.name} image"/>
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">${pokemon.name}</p>
        </div>`;
        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {
                window.location.href = `details.html?id=${pokemonID}`;
            }
        });
        listWrapper.appendChild(listItem);
    });
}
searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPokemons;

    if (numberFilter.checked) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            const pokemonID = pokemon.id;
            return pokemonID.toString().startsWith(searchTerm);
        });
    } else if (nameFilter.checked) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(searchTerm)
            
        });
    } else {
        filteredPokemons = allPokemons;
    }
    displayPokemons(filteredPokemons);

    if (filteredPokemons.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}
const closeButton = document.querySelector(".search-close");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
    searchInput.value = "";
    displayPokemons(allPokemons);
    notFoundMessage.style.display = "none";
}