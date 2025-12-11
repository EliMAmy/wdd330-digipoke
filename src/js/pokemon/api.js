import { fetchData } from "../utils/api.js";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1025";

export async function fetchAllPokemon() {
    const data = await fetchData(POKEMON_API_URL);
    return data.results;
}

export function getPokemonImageUrl(pokemon) {
    const pokemonID = pokemon.url.split("/")[6];
    return `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`;
}

export function getPokemonName(pokemon) {
    return pokemon.name;
}

export function getPokemonId(pokemon) {
    return pokemon.url.split("/")[6];
}
