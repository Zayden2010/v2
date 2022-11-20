setInterval(() => {
    blacket.requests.post("/worker/open", {
      pack: 'Debug'
    }, (data) => {
      if (data.error) location.reload()
      console.log(`Added 25,000 tokens!`)
    });
  }, 301);