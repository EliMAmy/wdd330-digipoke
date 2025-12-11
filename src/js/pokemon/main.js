import { fetchAllPokemon } from "./api.js";
import { setupInfiniteScroll } from "../utils/infiniteScroll.js";
import { setupSearch } from "../utils/search.js";
import { getPokemonImageUrl, getPokemonName, getPokemonId } from "./api.js";

(async function init() {
    const pokemonData = await fetchAllPokemon();
    setupInfiniteScroll(pokemonData, getPokemonImageUrl, getPokemonName, getPokemonId);
    setupSearch(pokemonData, getPokemonId, getPokemonName, getPokemonImageUrl);
})();
