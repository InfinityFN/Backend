document.addEventListener('DOMContentLoaded', () => {
    const locker = document.getElementById('locker');
    // Get the query string from the current URL
    var queryString = window.location.search;
    console.log(queryString.split('=')[1]);
    fetch(`/infinity/api/v2/cosmetics/user?sessionid=${queryString.split('=')[1]}`)
        .then(response => response.json())
        .then(data => {
            fetch("/locker/cosmetics.json")
                .then(response => response.json())
                .then(cosmetics => {

                    function openModal(itemType, itemId) {
                        fetch("/locker/cosmetics.json")
                            .then(response => response.json())
                            .then(cosmetics => {

                                console.log(itemId)

                                const item = cosmetics.data.find((item) => item.id.split(":").pop() === itemId && item.type.value === itemType);

                                console.log(item);


                                const modal = document.createElement("div");
                                modal.classList.add("modal");

                                const modalContent = document.createElement("div");
                                modalContent.classList.add("modal-content");
                                modalContent.classList.add("animate-in");


                                const itemName = document.createElement("h2");
                                itemName.textContent = item.name;
                                modalContent.appendChild(itemName);

                                const itemDesc = document.createElement("div");
                                itemDesc.textContent = item.description;
                                itemDesc.classList.add("card-text");
                                itemDesc.style.wordWrap = "break-word";


                                itemDesc.wordBreak = "break-word";
                                modalContent.appendChild(itemDesc);


                                const itemImage = document.createElement("img");
                                itemImage.classList.add("modal-icon");
                                itemImage.setAttribute("src", item.images.icon);
                                itemImage.setAttribute("alt", item.name);
                                itemImage.setAttribute("width", "128");
                                itemImage.setAttribute("height", "128");
                                modalContent.appendChild(itemImage);
                                if (item.images.featured) {
                                    const itemImage2 = document.createElement("img");
                                    itemImage2.classList.add("modal-icon2");
                                    itemImage2.setAttribute("src", item.images.featured);
                                    itemImage2.setAttribute("alt", item.name);
                                    modalContent.appendChild(itemImage2);
                                }



                                switch (item.rarity.value) {
                                    case 'common':
                                        itemImage.classList.add('common');
                                        break;
                                    case 'epic':
                                        itemImage.classList.add('epic');
                                        break;
                                    case 'legendary':
                                        itemImage.classList.add('legendary');
                                        break;
                                    case 'mythic':
                                        itemImage.classList.add('mythic');
                                        break;
                                    case 'rare':
                                        itemImage.classList.add('rare');
                                        break;
                                    case 'transcendent':
                                        itemImage.classList.add('transcendent');
                                        break;
                                    case 'uncommon':
                                        itemImage.classList.add('uncommon');
                                        break;
                                    case 'dark':
                                        itemImage.classList.add('dark');
                                        break;
                                    case 'dc':
                                        itemImage.classList.add('dc');
                                        break;
                                    case 'frozen':
                                        itemImage.classList.add('frozen');
                                        break;
                                }

                                modalContent.appendChild(itemImage);


                                const modalCloseButton = document.createElement("span");
                                modalCloseButton.classList.add("modal-close-button");
                                modalCloseButton.style.fontWeight = "bold";
                                modalCloseButton.innerHTML = "X";
                                modalCloseButton.addEventListener("click", () => {
                                    modal.style.display = "none";
                                })

                                modalContent.appendChild(modalCloseButton);
                                modal.appendChild(modalContent);


                                document.body.appendChild(modal);


                                modalContent.style.top = `calc(50% - ${modalContent.clientHeight / 2}px)`;

                            })
                            .catch(error => console.error(error));
                    }





                    const emoteSection = document.createElement("div");
                    emoteSection.classList.add("section");
                    emoteSection.innerHTML = "<h2>Emotes</h2>";

                    data.equipped.dances.eids.forEach(dance => {
                        if (dance !== "") {
                            const danceID = dance.split(":").pop();
                            const emote = cosmetics.data.find(item => item.id === danceID);

                            if (emote) {
                                const emoteCard = document.createElement("div");
                                emoteCard.classList.add("card", "mb-3");

                                const emoteRow = document.createElement("div");
                                emoteRow.classList.add("row");

                                const emoteDetailsCol = document.createElement("div");
                                emoteDetailsCol.classList.add("col-md-8", "item-details-col");


                                const emoteName = document.createElement("h5");
                                emoteName.textContent = emote.name;
                                emoteName.classList.add("card-title");
                                emoteDetailsCol.appendChild(emoteName);

                                const emoteDesc = document.createElement("p");
                                emoteDesc.classList.add("card-text");
                                emoteDesc.textContent = `${emote.description}`
                                emoteDetailsCol.appendChild(emoteDesc);



                                const emoteImageCol = document.createElement("div");
                                emoteImageCol.classList.add("col-md-4");
                                const emoteImage = document.createElement("img");
                                emoteImage.classList.add("item-image");
                                emoteImage.setAttribute("src", emote.images.icon);
                                emoteImage.setAttribute("alt", emote.name);
                                emoteImage.setAttribute("width", "128");
                                emoteImage.setAttribute("height", "128");

                                emoteImageCol.appendChild(emoteImage);

                                emoteRow.appendChild(emoteDetailsCol);
                                emoteRow.appendChild(emoteImageCol);

                                emoteCard.appendChild(emoteRow);
                                emoteSection.appendChild(emoteCard);

                                switch (emote.rarity.value) {
                                    case 'common':
                                        emoteImage.classList.add('common');
                                        break;
                                    case 'epic':
                                        emoteImage.classList.add('epic');
                                        break;
                                    case 'legendary':
                                        itemImage.classList.add('legendary');
                                        break;
                                    case 'mythic':
                                        emoteImage.classList.add('mythic');
                                        break;
                                    case 'rare':
                                        emoteImage.classList.add('rare');
                                        break;
                                    case 'transcendent':
                                        emoteImage.classList.add('transcendent');
                                        break;
                                    case 'uncommon':
                                        emoteImage.classList.add('uncommon');
                                        break;
                                    case 'dark':
                                        itemImage.classList.add('dark');
                                        break;
                                    case 'dc':
                                        emoteImage.classList.add('dc');
                                        break;
                                    case 'frozen':
                                        emoteImage.classList.add('frozen');
                                        break;
                                }

                                emoteCard.addEventListener("click", () => {
                                    openModal("emote", emote.id);
                                    console.log(emote.id)
                                });



                            }
                        }
                    })


                    const emotesDiv = document.querySelector("#emotes");
                    emotesDiv.appendChild(emoteSection);






                    const characterSection = document.createElement("div");
                    characterSection.classList.add("section");
                    characterSection.innerHTML = "<h2>Skin</h2>";

                    const characterID = data.equipped.character.cid;

                    const character = cosmetics.data.find(item => item.id.toLowerCase() === characterID.toLowerCase());

                    if (character) {

                        const characterCard = document.createElement("div");
                        characterCard.classList.add("card", "mb-3");


                        const charRow = document.createElement("div");
                        charRow.classList.add("row");

                        const charDetailsCol = document.createElement("div");
                        charDetailsCol.classList.add("col-md-8", "item-details-col");


                        const charName = document.createElement("h5");
                        charName.textContent = character.name;
                        charName.classList.add("card-title");
                        charDetailsCol.appendChild(charName);

                        const charDesc = document.createElement("p");
                        charDesc.classList.add("card-text");
                        charDesc.textContent = `${character.description}`
                        charDetailsCol.appendChild(charDesc);

                        const charImageCol = document.createElement("div");
                        charImageCol.classList.add("col-md-4");
                        const charImage = document.createElement("img");
                        charImage.classList.add("item-image");
                        charImage.setAttribute("src", character.images.icon);
                        charImage.setAttribute("alt", character.name);
                        charImage.setAttribute("width", "128");
                        charImage.setAttribute("height", "128");

                        charImageCol.appendChild(charImage);

                        charRow.appendChild(charDetailsCol);
                        charRow.appendChild(charImageCol);

                        characterCard.appendChild(charRow);
                        characterSection.appendChild(characterCard);

                        switch (character.rarity.value) {
                            case 'common':
                                charImage.classList.add('common');
                                break;
                            case 'epic':
                                charImage.classList.add('epic');
                                break;
                            case 'legendary':
                                charImage.classList.add('legendary');
                                break;
                            case 'mythic':
                                charImage.classList.add('mythic');
                                break;
                            case 'rare':
                                charImage.classList.add('rare');
                                break;
                            case 'transcendent':
                                charImage.classList.add('transcendent');
                                break;
                            case 'uncommon':
                                charImage.classList.add('uncommon');
                                break;
                            case 'dark':
                                charImage.classList.add('dark');
                                break;
                            case 'dc':
                                charImage.classList.add('dc');
                                break;
                            case 'frozen':
                                charImage.classList.add('frozen');
                                break;
                        }
                        characterCard.addEventListener("click", () => {
                            openModal("outfit", character.id);
                        });


                        window.addEventListener("click", (event) => {

                            const modal = document.querySelector(".modal");

                            if (event.target == modal) {

                                modal.style.display = "none";
                            }
                        });

                    }

                    const charactersDiv = document.querySelector("#characters");
                    charactersDiv.appendChild(characterSection);






                    const gliderSection = document.createElement("div");
                    gliderSection.classList.add("section");
                    gliderSection.innerHTML = "<h2>Glider</h2>";

                    const gliderID = data.equipped.glider.gliderid;

                    const glider = cosmetics.data.find(item => item.id.toLowerCase() === gliderID.toLowerCase());

                    if (glider) {

                        const gliderCard = document.createElement("div");
                        gliderCard.classList.add("card", "mb-3");

                        const gliderRow = document.createElement("div");
                        gliderRow.classList.add("row");

                        const gliderDetailsCol = document.createElement("div");
                        gliderDetailsCol.classList.add("col-md-8", "item-details-col");


                        const gliderName = document.createElement("h5");
                        gliderName.textContent = glider.name;
                        gliderName.classList.add("card-title");
                        gliderDetailsCol.appendChild(gliderName);

                        const gliderDesc = document.createElement("p");
                        gliderDesc.classList.add("card-text");
                        gliderDesc.textContent = `${glider.description}`
                        gliderDetailsCol.appendChild(gliderDesc);

                        const gliderImageCol = document.createElement("div");
                        gliderImageCol.classList.add("col-md-4");
                        const gliderImage = document.createElement("img");
                        gliderImage.classList.add("item-image");
                        gliderImage.setAttribute("src", glider.images.icon);
                        gliderImage.setAttribute("alt", glider.name);
                        gliderImage.setAttribute("width", "128");
                        gliderImage.setAttribute("height", "128");

                        gliderImageCol.appendChild(gliderImage);

                        gliderRow.appendChild(gliderDetailsCol);
                        gliderRow.appendChild(gliderImageCol);

                        gliderCard.appendChild(gliderRow);
                        gliderSection.appendChild(gliderCard);


                        switch (glider.rarity.value) {
                            case 'common':
                                gliderImage.classList.add('common');
                                break;
                            case 'epic':
                                gliderImage.classList.add('epic');
                                break;
                            case 'legendary':
                                gliderImage.classList.add('legendary');
                                break;
                            case 'mythic':
                                gliderImage.classList.add('mythic');
                                break;
                            case 'rare':
                                gliderImage.classList.add('rare');
                                break;
                            case 'transcendent':
                                gliderImage.classList.add('transcendent');
                                break;
                            case 'uncommon':
                                gliderImage.classList.add('uncommon');
                                break;
                            case 'dark':
                                gliderImage.classList.add('dark');
                                break;
                            case 'dc':
                                gliderImage.classList.add('dc');
                                break;
                            case 'frozen':
                                gliderImage.classList.add('frozen');
                                break;
                        }
                        gliderCard.addEventListener("click", () => {
                            openModal("glider", glider.id);
                        });
                    }


                    const glidersDiv = document.querySelector("#gliders");
                    glidersDiv.appendChild(gliderSection);






                    const backBlingSection = document.createElement("div");
                    backBlingSection.classList.add("section");
                    backBlingSection.innerHTML = "<h2>Back Bling</h2>";

                    const backBlingID = data.equipped.backpack.bid;

                    const backBling = cosmetics.data.find(item => item.id.toLowerCase() === backBlingID.toLowerCase());

                    if (backBling) {
                        const backBlingCard = document.createElement("div");
                        backBlingCard.classList.add("card", "mb-3");

                        const backBlingRow = document.createElement("div");
                        backBlingRow.classList.add("row");

                        const backBlingDetailsCol = document.createElement("div");
                        backBlingDetailsCol.classList.add("col-md-8", "item-details-col");


                        const backBlingName = document.createElement("h5");
                        backBlingName.textContent = backBling.name;
                        backBlingName.classList.add("card-title");
                        backBlingDetailsCol.appendChild(backBlingName);

                        const backBlingDesc = document.createElement("p");
                        backBlingDesc.classList.add("card-text");
                        backBlingDesc.textContent = `${backBling.description}`
                        backBlingDetailsCol.appendChild(backBlingDesc);

                        const backBlingImageCol = document.createElement("div");
                        backBlingImageCol.classList.add("col-md-4");
                        const backBlingImage = document.createElement("img");
                        backBlingImage.classList.add("item-image");
                        backBlingImage.setAttribute("src", backBling.images.icon);
                        backBlingImage.setAttribute("alt", backBling.name);
                        backBlingImage.setAttribute("width", "128");
                        backBlingImage.setAttribute("height", "128");

                        backBlingImageCol.appendChild(backBlingImage);

                        backBlingRow.appendChild(backBlingDetailsCol);
                        backBlingRow.appendChild(backBlingImageCol);

                        backBlingCard.appendChild(backBlingRow);
                        backBlingSection.appendChild(backBlingCard);


                        switch (backBling.rarity.value) {
                            case 'common':
                                backBlingImage.classList.add('common');
                                break;
                            case 'epic':
                                backBlingImage.classList.add('epic');
                                break;
                            case 'legendary':
                                backBlingImage.classList.add('legendary');
                                break;
                            case 'mythic':
                                backBlingImage.classList.add('mythic');
                                break;
                            case 'rare':
                                backBlingImage.classList.add('rare');
                                break;
                            case 'transcendent':
                                backBlingImage.classList.add('transcendent');
                                break;
                            case 'uncommon':
                                backBlingImage.classList.add('uncommon');
                                break;
                            case 'dark':
                                backBlingImage.classList.add('dark');
                                break;
                            case 'dc':
                                backBlingImage.classList.add('dc');
                                break;
                            case 'frozen':
                                backBlingImage.classList.add('frozen');
                                break;
                        }
                        backBlingCard.addEventListener("click", () => {
                            openModal("backpack", backBling.id);
                        });
                    }


                    const backBlingDiv = document.querySelector("#backbling");
                    backBlingDiv.appendChild(backBlingSection);




                    const pickaxeSection = document.createElement("div");
                    pickaxeSection.classList.add("section");
                    pickaxeSection.innerHTML = "<h2>Pickaxe</h2>";

                    const pickaxeID = data.equipped.pickaxe.pickaxeid;

                    const pickaxe = cosmetics.data.find(item => item.id.toLowerCase() === pickaxeID.toLowerCase());

                    if (pickaxe) {
                        const pickaxeCard = document.createElement("div");
                        pickaxeCard.classList.add("card", "mb-3");

                        const pickaxeRow = document.createElement("div");
                        pickaxeRow.classList.add("row");

                        const pickaxeDetailsCol = document.createElement("div");
                        pickaxeDetailsCol.classList.add("col-md-8", "item-details-col");


                        const pickaxeName = document.createElement("h5");
                        pickaxeName.textContent = pickaxe.name;
                        pickaxeName.classList.add("card-title");
                        pickaxeDetailsCol.appendChild(pickaxeName);

                        const pickaxeDesc = document.createElement("p");
                        pickaxeDesc.classList.add("card-text");
                        pickaxeDesc.textContent = `${pickaxe.description}`
                        pickaxeDetailsCol.appendChild(pickaxeDesc);

                        const pickaxeImageCol = document.createElement("div");
                        pickaxeImageCol.classList.add("col-md-4");
                        const pickaxeImage = document.createElement("img");
                        pickaxeImage.classList.add("item-image");
                        pickaxeImage.setAttribute("src", pickaxe.images.icon);
                        pickaxeImage.setAttribute("alt", pickaxe.name);
                        pickaxeImage.setAttribute("width", "128");
                        pickaxeImage.setAttribute("height", "128");

                        pickaxeImageCol.appendChild(pickaxeImage);

                        pickaxeRow.appendChild(pickaxeDetailsCol);
                        pickaxeRow.appendChild(pickaxeImageCol);

                        pickaxeCard.appendChild(pickaxeRow);
                        pickaxeSection.appendChild(pickaxeCard);

                        switch (pickaxe.rarity.value) {
                            case 'common':
                                pickaxeImage.classList.add('common');
                                break;
                            case 'epic':
                                pickaxeImage.classList.add('epic');
                                break;
                            case 'legendary':
                                pickaxeImage.classList.add('legendary');
                                break;
                            case 'mythic':
                                pickaxeImage.classList.add('mythic');
                                break;
                            case 'rare':
                                pickaxeImage.classList.add('rare');
                                break;
                            case 'transcendent':
                                pickaxeImage.classList.add('transcendent');
                                break;
                            case 'uncommon':
                                pickaxeImage.classList.add('uncommon');
                                break;
                            case 'dark':
                                pickaxeImage.classList.add('dark');
                                break;
                            case 'dc':
                                pickaxeImage.classList.add('dc');
                                break;
                            case 'frozen':
                                pickaxeImage.classList.add('frozen');
                                break;
                        }
                        pickaxeCard.addEventListener("click", () => {
                            openModal("pickaxe", pickaxe.id);
                        });
                    }


                    const pickaxesDiv = document.querySelector("#pickaxe");
                    pickaxesDiv.appendChild(pickaxeSection);



                    const loadingScreenSection = document.createElement("div");
                    loadingScreenSection.classList.add("section");
                    loadingScreenSection.innerHTML = "<h2>Loading Screen</h2>";

                    const loadingScreenID = data.equipped.loadingscreen.lsid;

                    const loadingScreen = cosmetics.data.find(item => item.id.toLowerCase() === loadingScreenID.toLowerCase());

                    if (loadingScreen) {


                        const loadingScreenCard = document.createElement("div");
                        loadingScreenCard.classList.add("card", "mb-3");

                        const loadingScreenRow = document.createElement("div");
                        loadingScreenRow.classList.add("row");

                        const loadingScreenDetailsCol = document.createElement("div");
                        loadingScreenDetailsCol.classList.add("col-md-8", "item-details-col");

                        const loadingScreenName = document.createElement("h5");
                        loadingScreenName.textContent = loadingScreen.name;
                        loadingScreenName.classList.add("card-title");
                        loadingScreenDetailsCol.appendChild(loadingScreenName);

                        const loadingScreenDesc = document.createElement("p");
                        loadingScreenDesc.classList.add("card-text");
                        loadingScreenDesc.textContent = `${loadingScreen.description}`;
                        loadingScreenDetailsCol.appendChild(loadingScreenDesc);

                        const loadingScreenImageCol = document.createElement("div");
                        loadingScreenImageCol.classList.add("col-md-4");
                        const loadingScreenImage = document.createElement("img");
                        loadingScreenImage.classList.add("item-image");
                        loadingScreenImage.setAttribute("src", loadingScreen.images.icon);
                        loadingScreenImage.setAttribute("alt", loadingScreen.name);
                        loadingScreenImage.setAttribute("width", "128");
                        loadingScreenImage.setAttribute("height", "128");

                        loadingScreenImageCol.appendChild(loadingScreenImage);

                        loadingScreenRow.appendChild(loadingScreenDetailsCol);
                        loadingScreenRow.appendChild(loadingScreenImageCol);

                        loadingScreenCard.appendChild(loadingScreenRow);
                        loadingScreenSection.appendChild(loadingScreenCard);

                        switch (loadingScreen.rarity.value) {
                            case 'common':
                                loadingScreenImage.classList.add('common');
                                break;
                            case 'epic':
                                loadingScreenImage.classList.add('epic');
                                break;
                            case 'legendary':
                                loadingScreenImage.classList.add('legendary');
                                break;
                            case 'mythic':
                                loadingScreenImage.classList.add('mythic');
                                break;
                            case 'rare':
                                loadingScreenImage.classList.add('rare');
                                break;
                            case 'transcendent':
                                loadingScreenImage.classList.add('transcendent');
                                break;
                            case 'uncommon':
                                loadingScreenImage.classList.add('uncommon');
                                break;
                            case 'dark':
                                loadingScreenImage.classList.add('dark');
                                break;
                            case 'dc':
                                loadingScreenImage.classList.add('dc');
                                break;
                            case 'frozen':
                                loadingScreenImage.classList.add('frozen');
                                break;
                        }
                        loadingScreenCard.addEventListener("click", () => {
                            openModal("loadingscreen", loadingScreen.id);
                        });
                    }


                    const loadingScreenDiv = document.querySelector("#loadingscreen");
                    loadingScreenDiv.appendChild(loadingScreenSection);



                    const vbucksSection = document.createElement("div");
                    vbucksSection.classList.add("section");
                    vbucksSection.innerHTML = "<h2>VBUCKS</h2>";

                    const vbucksAmount = data.vbucks;
                    const vbucksId = "VBUCKS";

                    if (vbucks) {
                        const vbucksCard = document.createElement("div");
                        vbucksCard.classList.add("card", "mb-3");

                        const vbucksRow = document.createElement("div");
                        vbucksRow.classList.add("row");

                        const vbucksDetailsCol = document.createElement("div");
                        vbucksDetailsCol.classList.add("col-md-8", "item-details-col");

                        const vbucksName = document.createElement("h5");
                        vbucksName.textContent = `Amount: ${vbucksAmount}`;
                        vbucksName.classList.add("card-title");
                        vbucksDetailsCol.appendChild(vbucksName);

                        const vbucksDesc = document.createElement("p");
                        vbucksDesc.classList.add("card-text");
                        vbucksDesc.textContent = `Currency To Purchase Items!`;
                        vbucksDetailsCol.appendChild(vbucksDesc);

                        const vbucksImageCol = document.createElement("div");
                        vbucksImageCol.classList.add("col-md-4");
                        const vbucksImage = document.createElement("img");
                        vbucksImage.classList.add("item-image");
                        vbucksImage.setAttribute("src", "/vbuck.png");
                        vbucksImage.setAttribute("alt", vbucksAmount);
                        vbucksImage.setAttribute("width", "128");
                        vbucksImage.setAttribute("height", "128");

                        vbucksImageCol.appendChild(vbucksImage);

                        vbucksRow.appendChild(vbucksDetailsCol);
                        vbucksRow.appendChild(vbucksImageCol);

                        vbucksCard.appendChild(vbucksRow);
                        vbucksSection.appendChild(vbucksCard);


                        vbucksImage.classList.add('legendary');

                        vbucksCard.addEventListener("click", () => {
                            openModal("vbucks", vbucksId);
                        });

                    }


                    const vbucksDiv = document.querySelector("#vbucks");
                    vbucksDiv.appendChild(vbucksSection);










                    const wrapSection = document.createElement("div");
                    wrapSection.classList.add("section");
                    wrapSection.innerHTML = "<h2>Wraps</h2>";

                    data.equipped.wraps.wrap.forEach(wrap => {
                        if (wrap !== "") {
                            const wrapID = wrap.split(":").pop();
                            const wrap1 = cosmetics.data.find(item => item.id === wrapID);

                            if (wrap1) {
                                const wrapCard = document.createElement("div");
                                wrapCard.classList.add("card", "mb-3");

                                const wrapRow = document.createElement("div");
                                wrapRow.classList.add("row");

                                const wrapDetailsCol = document.createElement("div");
                                wrapDetailsCol.classList.add("col-md-8", "item-details-col");


                                const wrapName = document.createElement("h5");
                                wrapName.textContent = wrap1.name;
                                wrapName.classList.add("card-title");
                                wrapDetailsCol.appendChild(wrapName);

                                const wrapDesc = document.createElement("p");
                                wrapDesc.classList.add("card-text");
                                wrapDesc.textContent = `${wrap1.description}`
                                wrapDetailsCol.appendChild(wrapDesc);

                                const wrapImageCol = document.createElement("div");
                                wrapImageCol.classList.add("col-md-4");
                                const wrapImage = document.createElement("img");
                                wrapImage.classList.add("item-image");
                                wrapImage.setAttribute("src", wrap1.images.icon);
                                wrapImage.setAttribute("alt", wrap1.name);
                                wrapImage.setAttribute("width", "128");
                                wrapImage.setAttribute("height", "128");

                                wrapImageCol.appendChild(wrapImage);

                                wrapRow.appendChild(wrapDetailsCol);
                                wrapRow.appendChild(wrapImageCol);

                                wrapCard.appendChild(wrapRow);
                                wrapSection.appendChild(wrapCard);

                                switch (wrap1.rarity.value) {
                                    case 'common':
                                        wrapImage.classList.add('common');
                                        break;
                                    case 'epic':
                                        wrapImage.classList.add('epic');
                                        break;
                                    case 'legendary':
                                        wrapImage.classList.add('legendary');
                                        break;
                                    case 'mythic':
                                        wrapImage.classList.add('mythic');
                                        break;
                                    case 'rare':
                                        wrapImage.classList.add('rare');
                                        break;
                                    case 'transcendent':
                                        wrapImage.classList.add('transcendent');
                                        break;
                                    case 'uncommon':
                                        wrapImage.classList.add('uncommon');
                                        break;
                                    case 'dark':
                                        wrapImage.classList.add('dark');
                                        break;
                                    case 'dc':
                                        wrapImage.classList.add('dc');
                                        break;
                                    case 'frozen':
                                        wrapImage.classList.add('frozen');
                                        break;
                                }
                                wrapCard.addEventListener("click", () => {
                                    openModal("wrap", wrap1.id);
                                });
                            }
                        }
                    });


                    const wrapsDiv = document.querySelector("#wraps");
                    wrapsDiv.appendChild(wrapSection);

                })

        })
        .catch(error => console.log(error));
});
