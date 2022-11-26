let pack = prompt(`Pack to open?`);
if (!blacket.packs) {
  alert(`You must be at the market to run this script.`);
  location.href = 'https://v2.blacket.org/market';
} else if (!Object.keys(blacket.packs).includes(pack)) {
  alert('That\'s not a pack.');
  pack = prompt(`Pack to open?`);
}

let amount = prompt(`How many of the ${pack} pack?\nType * for max possible with your tokens.`)
if (amount.toString() === '*') amount = Number.MAX_VALUE;
let i = 0;

function open(pack) {
  blacket.requests.post("/worker/open", {
    pack: pack
  }, (data) => {
    if (data.error && data.error !== 'You are opening packs too fast.') location.reload();
    if (!data.error) console.log('%c%s', `color: white; font-size: 25px; text-shadow: 0px 0px 15px ${blacket.rarities[blacket.blooks[data.blook].rarity].color}`, `${data.blook}`);
  });
};

let check = setInterval(() => {
  if (i < amount) {
    open(pack);
    i++;
  } else {
    clearInterval(check);
    alert(`Box opening complete!`);
  };
}, 301);
