const search = document.getElementById("search");
const info = document.getElementById("token-info");

search.addEventListener("keypress", async (e) => {
  if (e.key !== "Enter") return;

  info.innerHTML = "Loading...";
  const q = search.value;

  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/search/?q=${q}`
  );
  const data = await res.json();

  if (!data.pairs || !data.pairs.length) {
    info.innerHTML = "Token not found";
    return;
  }

  const p = data.pairs[0];

  info.innerHTML = `
    <h2>${p.baseToken.symbol}/${p.quoteToken.symbol}</h2>
    💰 Price: $${Number(p.priceUsd).toFixed(6)}<br>
    💧 Liquidity: $${Number(p.liquidity.usd).toLocaleString()}<br>
    📊 Volume 24h: $${Number(p.volume.h24).toLocaleString()}
  `;
});

