let packName = prompt('Which pack would you like to open? (Capitilzation matters)')
let amount = Number.parseInt(prompt(`How many of the ${packName} pack would you to open?`));

function wait(ms) {
    var dt = new Date();
    while ((new Date()) - dt <= ms) {};
};

async function openPack(amount, packName) {
    let est = amount * 300;
    let finalTime = new Date();
    finalTime.setMilliseconds(finalTime.getMilliseconds() + est);
    console.log(`Your ${amount.toLocaleString()} ${packName} packs will finish at ${finalTime}, or in ${(est/1000).toLocaleString()} seconds`);
    for (i = 0; i < amount; i++) {
        data = await (blacket.requests.post("/worker/open", {pack: packName}));
        wait(300);
    };
    alert(`Your ${amount.toLocaleString()} ${packName} packs have finished opening`);
};

openPack(amount, packName);
