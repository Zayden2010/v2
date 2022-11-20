async function score(t) {
    let w = (await (await fetch(`https://v2.blacket.org/worker/user/${t}`)).json());
      if (w.error) return alert(w.error);
      let e = w.user,
      r = e.blooks,
      a = (await (await fetch("https://v2.blacket.org/worker/blooks")).json()).blooks,
      o = Object.keys(a),
      s = o.length,
      i = Object.keys(r).length / s,
      k = Object.keys(r).map(t => {
        if (!a[t]) return;
        let e = a[t];
        return e._name = t, e
      }).filter(Boolean).filter(t => "Blacket" != t._name),
      l = Object.keys((await (await fetch("https://v2.blacket.org/worker/rarities")).json()).rarities),
      n = 0;
    for (let w of k) n += l.indexOf(w.rarity) + 1;
    return {
      blooks: Number((100 * i).toFixed(2)),
      rarityScore: Number(n.toFixed(2))
    }
  }
  
  score(prompt('Enter a user\'s name to score...\Created by l2vy7'));