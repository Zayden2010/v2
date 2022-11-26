if (!confirm('Do you actually want to sell all of your duplicate blooks?')) alert(`I'm glad I asked.`);
else {
  if (!blacket.blooks) {
    alert(`You must be on the market or blooks page to run this script.`);
    location.reload();
  }
  
  let qnt;

  function sell(blook, amount) {
    blacket.requests.post("/worker/sell", {
      blook: blook,
      quantity: amount
    }, (res) => {
      if (res.error) location.reload();
    });
  };

  Object.keys(blacket.blooks).forEach((blook) => {
    if (Object.keys(blacket.user.blooks).includes(blook)) {
      qnt = blacket.user.blooks[blook] - 1;
      if (qnt == 0) return;
      sell(blook, qnt);
      console.log(`Selling ${qnt} ${blook}`);
    };
  });
}
