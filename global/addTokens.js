setInterval(async () => {
  let x = await (await fetch('https://v2.blacket.org/worker/open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pack: 'Debug'
    }),
  })).json()
  if (x.error) location.reload()
  console.log(`Added 25,000 tokens!`)
}, 301);
