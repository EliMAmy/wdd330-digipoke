const MAX_POKEMON = 1488;

const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const notFoundMessage = document.querySelector("#not-found-message");
const closeButton = document.querySelector(".search-close");

let allPokemons = [];
let currentIndex = 0;
const PAGE_SIZE = 30;
let isSearching = false;

fetch(`https://digi-api.com/api/v1/digimon?pageSize=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        allPokemons = data.content;
        loadNextPage();
    });

function loadNextPage() {
    if (isSearching) return;

    const nextPokemons = allPokemons.slice(currentIndex, currentIndex + PAGE_SIZE);
    displayPokemons(nextPokemons);

    currentIndex += PAGE_SIZE;
}

export default function displayPokemons(pokemons) {
    pokemons.forEach((pokemon) => {
        const listItem = document.createElement("div");
        listItem.className = "list-item";

        listItem.innerHTML = `
            <div class="number-wrap"> 
                <p>${pokemon.id}</p>
            </div>
            <div class="img-wrap">
                <img src="https://digi-api.com/images/digimon/w/${pokemon.name.replaceAll(" ","_")}.png" alt="${pokemon.name} loading="lazy"/>
            </div>
            <div class="name-wrap">
                <p>${pokemon.name}</p>
            </div>
        `;

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
        filtered = allPokemons.filter(p => p.id.toString().startsWith(searchTerm));
    } else {
        filtered = allPokemons.filter(p => p.name.toLowerCase().startsWith(searchTerm));
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