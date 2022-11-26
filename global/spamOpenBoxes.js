let pack = prompt(`Box to open?`);
if (!blacket.packs) {
  alert(`You must be at the market to run this script.`);
  location.href = 'https://v2.blacket.org/market';
}
if (!Object.keys(blacket.packs).includes(pack)) return alert('That\'s not a pack.');
pack = prompt(`Box to open?`);

let amount = prompt(`Amount of ${box} box?\nType * for max possible.`)
if (amt.toString === '*') amount = Number.MAX_VALUE;
let i = 0;

function openPack(pack) {
  blacket.requests.post("/worker/open", {
    pack: pack
  }, (data) => {
    if (data.error) location.reload();
    console.log('%c%s', `color: white; font-size: 25px; text-shadow: 0px 0px 15px ${blacket.rarities[blacket.blooks[data.blook].rarity].color}`, `${data.blook}`);
  });
};

let check = setInterval(() => {
  if (i < amt) {
    openPack(pack);
    i++;
  } else {
    clearInterval(check);
    alert(`Box opening complete!`);
  };
}, 301);
