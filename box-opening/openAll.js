if (!blacket.packs) {
    alert(`This script must be run on the Market.`);
    location.href = 'https://v2.blacket.org/market';
};

let amount = Number.parseInt(prompt(`How many times do you want to open every pack?\nScript created by Piotr.`));

function wait(ms) {
    var dt = new Date();
    while ((new Date()) - dt <= ms) {};
};

async function openAll(amount) {
    for (i = 0; i < amount; i++) {
        for (j = 0; j < Object.keys(blacket.packs).length; j++) {
            data = await blacket.requests.post("/worker/open", {pack: Object.keys(blacket.packs)[j]});
            wait(300);
        };
        console.log(`Succesfully opened ${i+1}/${amount} rounds.`);
    };
    alert(`Your ${amount.toLocaleString()} ${packName} packs have finished opening.`);
};

openAll(amount);
