import { renderPokemonOrDigimonList, clearList } from "./renderer.js";
import { loadNextPage, enableSearchMode, disableSearchMode } from "./infiniteScroll.js";

const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const closeButton = document.querySelector(".search-close");
const notFoundMessage = document.querySelector("#not-found-message");

let allData = [];
let getId, getName, getImageUrl;

export function setupSearch(data, idFn, nameFn, imageUrlFn) {
    allData = data;
    getId = idFn;
    getName = nameFn;
    getImageUrl = imageUrlFn;

    searchInput.addEventListener("keyup", onSearch);
    closeButton.addEventListener("click", resetSearch);
}

function onSearch() {
    const term = searchInput.value.toLowerCase();

    if (term === "") {
        resetSearch();
        return;
    }

    enableSearchMode();
    clearList();

    let filtered;

    if (numberFilter.checked) {
        filtered = allData.filter(p => getId(p).toString().startsWith(term));
    } else {
        filtered = allData.filter(p => getName(p).toLowerCase().startsWith(term));
    }

    renderPokemonOrDigimonList(filtered, getImageUrl, getName, getId);
    notFoundMessage.style.display = filtered.length === 0 ? "block" : "none";
}

function resetSearch() {
    searchInput.value = "";
    notFoundMessage.style.display = "none";

    disableSearchMode();
    clearList();
    loadNextPage(getImageUrl, getName, getId);
}
