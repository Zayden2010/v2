if (blacket.config.path !== 'blooks') {
    $("body").append(`<div id="errorModal" class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase"><div>Wrong Page<br><br>You need to be on the Blooks page to run this script.</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div id="closeButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Okay</div></div></div></div><input type="submit" style="opacity: 0; display: none;" /></form></div>`);
    $("#closeButton").click(() => $("#errorModal").remove());
}

document.getElementsByClassName('styles__blooksHolder___3qZR1-camelCase')[0].replaceChildren();
document.getElementsByClassName("styles__rightButtonRow___3a0GF-camelCase")[0].remove();

blacket.requests.get(`/worker/user/${prompt('Enter username:')}`, (data) => {
    if (data.error) window.location.href = "/logout";
    blacket.user.blooks = data.user.blooks;
    blacket.packBlooks = [];
    blacket.requests.get("/worker/packs", (data) => {
        blacket.packs = data.packs;
        Object.keys(blacket.packs).reverse().forEach((pack) => {
            if (blacket.packs[pack].hidden) return;
            let packId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
            $(".styles__blooksHolder___3qZR1-camelCase").append(`<div class="styles__setHolder___rVq3Z-camelCase"><div class="styles__setTop___wIaVS-camelCase"><div class="styles__setTopBackground___342Wr-camelCase" style="background-image: url('/content/blookTile.png');"></div><div class="styles__setText___1PQLQ-camelCase">${pack} Pack</div><div class="styles__setDivider___3da0c-camelCase"></div></div><div id="${packId}" class="styles__setBlooks___3xamH-camelCase"></div></div>`);
            Object.entries(blacket.packs[pack].blooks).forEach((blook) => {
                blacket.packBlooks.push(blook[1]);
                let locked;
                if (!blacket.user.blooks[blook[1]]) locked = {
                    class: `styles__lockedBlook___3oGaX-camelCase`,
                    i: `<i class="fas fa-lock styles__blookLock___3Kgua-camelCase" aria-hidden="true"></i>`,
                    quantity: ``,
                    cursor: 'auto'
                };
                else {
                    let quantity;
                    if (blacket.rarities[blacket.blooks[blook[1]].rarity].color == "rainbow") quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-image: url('/content/rainbow.gif');">${blacket.user.blooks[blook[1]].toLocaleString()}</div></div>`;
                    else quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-color: ${blacket.rarities[blacket.blooks[blook[1]].rarity].color};">${blacket.user.blooks[blook[1]].toLocaleString()}</div></div>`;
                    locked = {
                        class: ``,
                        i: ``,
                        quantity: quantity,
                        cursor: 'pointer'
                    };
                };
                $(`#${packId}`).append(`<div id="${blook[1].replaceAll(' ', '-').replaceAll("'", "_")}" class="styles__blookContainer___3JrKb-camelCase" style="cursor: ${locked.cursor}" role="button" tabindex="0"><div class="styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase ${locked.class}"><img loading="lazy" src="${blacket.blooks[blook[1]].image}" draggable="false" class="styles__blook___1R6So-camelCase" /></div>${locked.i}${locked.quantity}`);
                $(`#${blook[1].replaceAll(' ', '-').replaceAll("'", "_")}`).click(function() {
                    if (this.children[0].classList.contains(`styles__lockedBlook___3oGaX-camelCase`)) return;
                    blacket.selectBlook(blook[1]);
                });
            });
        });
      
        let uncatogorizedBlooks = [];
        Object.keys(blacket.user.blooks).forEach(blook => {
            if (!blacket.packBlooks.includes(blook) && blacket.blooks[blook]) uncatogorizedBlooks.push(blook);
        });
        if (uncatogorizedBlooks.length > 0) {
            let packId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
            $(".styles__blooksHolder___3qZR1-camelCase").append(`<div class="styles__setHolder___rVq3Z-camelCase"><div class="styles__setTop___wIaVS-camelCase"><div class="styles__setTopBackground___342Wr-camelCase" style="background-image: url('/content/blookTile.png');"></div><div class="styles__setText___1PQLQ-camelCase">Miscellaneous</div><div class="styles__setDivider___3da0c-camelCase"></div></div><div id="${packId}" class="styles__setBlooks___3xamH-camelCase"></div></div>`);
            uncatogorizedBlooks.forEach(blook => {
                if (!blacket.blooks[blook]) return;
                let quantity;
                if (blacket.rarities[blacket.blooks[blook].rarity] && blacket.rarities[blacket.blooks[blook].rarity].color == "rainbow") quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-image: url('/content/rainbow.gif');">${blacket.user.blooks[blook].toLocaleString()}</div></div>`;
                else quantity = `<div class="styles__blookText___3AMdK-camelCase" style="background-color: ${blacket.rarities[blacket.blooks[blook].rarity].color};">${blacket.user.blooks[blook].toLocaleString()}</div></div>`;
                $(`#${packId}`).append(`<div id="${blook.replaceAll(' ', '-').replaceAll("'", "_")}" class="styles__blookContainer___3JrKb-camelCase" style="cursor: pointer" role="button" tabindex="0"><div class="styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase"><img loading="lazy" src="${blacket.blooks[blook].image}" draggable="false" class="styles__blook___1R6So-camelCase" /></div>${quantity}`);
                $(`#${blook.replaceAll(' ', '-').replaceAll("'", "_")}`).click(function() {
                    blacket.selectBlook(blook);
                });
            });
        };
    });
});