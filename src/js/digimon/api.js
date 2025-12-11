import { fetchData } from "../utils/api.js";

const DIGIMON_API_URL = "https://digi-api.com/api/v1/digimon?pageSize=1488";

export async function fetchAllDigimon() {
    const data = await fetchData(DIGIMON_API_URL);
    return data.content;
}

export function getDigimonImageUrl(digimon) {
    return `https://digi-api.com/images/digimon/w/${digimon.name.replaceAll(" ", "_")}.png`;
}

export function getDigimonName(digimon) {
    return digimon.name;
}

export function getDigimonId(digimon) {
    return digimon.id;
}
