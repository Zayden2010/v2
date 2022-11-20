let qnt;

function sellBlook(blook, amount) {
  blacket.requests.post("/worker/sell", {
    blook: blook,
    quantity: amount
  }, (res) => {});
};

Object.keys(blacket.blooks).forEach((blook) => {
  if (Object.keys(blacket.user.blooks).includes(blook)) {
    qnt = blacket.user.blooks[blook] - 1;
    if (qnt == 0) return;
    sellBlook(blook, qnt);
    console.log(`Selling ${qnt} ${blook}`);
  };
});