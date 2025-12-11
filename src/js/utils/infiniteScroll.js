import { renderPokemonOrDigimonList } from "./renderer.js";

let allData = [];
let currentIndex = 0;
const PAGE_SIZE = 30;
let isSearching = false;

export function setupInfiniteScroll(data, getImageUrl, getName, getId) {
    allData = data;
    loadNextPage(getImageUrl, getName, getId);

    window.addEventListener("scroll", onScroll);
}

function onScroll() {
    if (isSearching) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadNextPage(getImageUrl, getName, getId);
    }
}

export function loadNextPage(getImageUrl, getName, getId) {
    const nextBatch = allData.slice(currentIndex, currentIndex + PAGE_SIZE);
    renderPokemonOrDigimonList(nextBatch, getImageUrl, getName, getId);
    currentIndex += PAGE_SIZE;
}

export function enableSearchMode() {
    isSearching = true;
}

export function disableSearchMode() {
    isSearching = false;
    currentIndex = 0;
}
