let pack = prompt(`Box to open?`, `Space`);
let amount = prompt(`Amount of ${box} box?\nType * for max possible.`)
if (isNaN(amt)) amount = Number.MAX_VALUE;
let i = 0;

function openPack(pack) {
  blacket.requests.post("/worker/open", {
    pack: pack
  }, (data) => {
    if (data.error) {
      if (data.error === 'Unauthorized') location.reload();
      alert(data.error);
      i--;
      return;
    };
    console.log('%c%s', `color: white; font-size: 25px; text-shadow: 0px 0px 15px ${blacket.rarities[blacket.blooks[data.blook].rarity].color}`, `${data.blook}`);
  });
};

let check = setInterval(() => {
  if (i < amt) {
    openPack(pack);
    i++;
  } else {
    clearInterval(check);
    alert(`Box opening complete!`)
  }
}, 301);