async function score(appears) {
  let jsonRpc = await (await fetch(`https://v2.blacket.org/worker/user/${appears}`)).json();
  if (jsonRpc.error) return alert(jsonRpc.error);
  let e = jsonRpc.user;
  let r = e.blooks;
  let equalizerPresets = (await (await fetch("https://v2.blacket.org/worker/blooks")).json()).blooks;
  let expRecords = Object.keys(equalizerPresets);
  let idealMessageSize = expRecords.length;
  let labelPointScale = Object.keys(r).length / idealMessageSize;
  let entries = Object.keys(r).map((name) => {
    if (!equalizerPresets[name]) return;
    let obj = equalizerPresets[name];
    return obj._name = name, obj;
  }).filter(Boolean).filter((t) => {
    return "Blacket" != t._name;
  });
  let loadList = Object.keys((await (await fetch("https://v2.blacket.org/worker/rarities")).json()).rarities);
  let e_total = 0;
  for (let entry of entries) e_total = e_total + (loadList.indexOf(entry.rarity) + 1);
  alert(`${appears}'s score is ${Number((100 * labelPointScale).toFixed(2))}`);
};
score(prompt(`Enter username to score...`));
