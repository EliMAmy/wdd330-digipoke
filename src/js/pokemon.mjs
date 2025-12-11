const MAX_POKEMON = 1025;

const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const notFoundMessage = document.querySelector("#not-found-message");
const closeButton = document.querySelector(".search-close");

let allPokemons = [];
let currentIndex = 0;
const PAGE_SIZE = 30;
let isSearching = false;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        allPokemons = data.results;
        loadNextPage();
    });

function loadNextPage() {
    if (isSearching) return;

    const nextPokemons = allPokemons.slice(currentIndex, currentIndex + PAGE_SIZE);
    displayPokemons(nextPokemons);

    currentIndex += PAGE_SIZE;
}

export default function displayPokemons(pokemon) {
    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
        <div class="number-wrap"> 
            <p>${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name} loading="lazy"/>
        </div>
        <div class="name-wrap">
            <p>${pokemon.name}</p>
        </div>`;

/*         listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {
                window.location.href = `details.html?id=${pokemonID}`;
            }
        }); */
        listWrapper.appendChild(listItem);
    });
}

window.addEventListener("scroll", () => {
    if (isSearching) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadNextPage();
    }
});

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === "") {
        restoreInfiniteScroll();
        return;
    }

    isSearching = true;
    listWrapper.innerHTML = "";

    let filtered = [];

    if (numberFilter.checked) {
        filtered = allPokemons.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchTerm);
        });
    } else {
        filtered = allPokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(searchTerm)
        });
    }
    displayPokemons(filtered);

    notFoundMessage.style.display = filtered.length === 0 ? "block" : "none";
}

function restoreInfiniteScroll() {
    isSearching = false;
    listWrapper.innerHTML = "";
    currentIndex = 0;
    notFoundMessage.style.display = "none";
    loadNextPage();
}

closeButton.addEventListener("click", () => {
    searchInput.value = "";
    restoreInfiniteScroll();
});