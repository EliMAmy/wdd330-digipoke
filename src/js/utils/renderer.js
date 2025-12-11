const listWrapper = document.querySelector(".list-wrapper");

export function renderPokemonOrDigimonList(items, getImageUrl, getName, getId) {
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "list-item";

        const itemID = getId(item);
        const itemName = getName(item);

        card.innerHTML = `
            <div class="number-wrap">
                <p>${itemID}</p>
            </div>

            <div class="img-wrap">
                <img src="${getImageUrl(item)}" alt="${itemName}" loading="lazy">
            </div>

            <div class="name-wrap">
                <p>${itemName}</p>
            </div>
        `;

        listWrapper.appendChild(card);
    });
}

export function clearList() {
    listWrapper.innerHTML = "";
}
