import { fetchAllDigimon } from "./api.js";
import { setupInfiniteScroll } from "../utils/infiniteScroll.js";
import { setupSearch } from "../utils/search.js";
import { getDigimonImageUrl, getDigimonName, getDigimonId } from "./api.js";

(async function init() {
    const digimonData = await fetchAllDigimon();
    setupInfiniteScroll(digimonData, getDigimonImageUrl, getDigimonName, getDigimonId);
    setupSearch(digimonData, getDigimonId, getDigimonName, getDigimonImageUrl);
})();
