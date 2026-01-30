let currentChain = "ethereum";
const search = document.getElementById("search");
const info = document.getElementById("token-info");

search.addEventListener("keypress", async (e) => {
  if (e.key !== "Enter") return;

  info.innerHTML = "Loading...";
  const q = search.value;

  const res = await fetch(
  `https://api.dexscreener.com/latest/dex/search/?q=${q}&chainIds=${currentChain}`
);
  const data = await res.json();

  if (!data.pairs || !data.pairs.length) {
    info.innerHTML = "Token not found";
    return;
  }

  const p = data.pairs[0];
  loadChart(p.baseToken.symbol + "USD");

  info.innerHTML = `
    <h2>${p.baseToken.symbol}/${p.quoteToken.symbol}</h2>
    💰 Price: $${Number(p.priceUsd).toFixed(6)}<br>
    💧 Liquidity: $${Number(p.liquidity.usd).toLocaleString()}<br>
    📊 Volume 24h: $${Number(p.volume.h24).toLocaleString()}
  `;
});
function loadChart(symbol) {
  document.getElementById("tv-chart").src =
    `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=15&theme=dark&style=1&locale=en`;
}
async function loadTopGainers() {
  const res = await fetch(
  `https://api.dexscreener.com/latest/dex/pairs/${currentChain}`
);
  const data = await res.json();

  const list = document.getElementById("gainers-list");
  list.innerHTML = "";

  data.pairs
    .filter(p => p.volume?.h24 && p.priceChange?.h24)
    .sort((a, b) => b.volume.h24 - a.volume.h24)
    .slice(0, 8)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "gainer-card";
      card.innerHTML = `
        <div class="sym">${p.baseToken.symbol}</div>
        <div class="price">$${Number(p.priceUsd).toFixed(6)}</div>
        <div class="up">▲ ${p.priceChange.h24}%</div>
      `;
      card.onclick = () => {
        document.getElementById("search").value = p.baseToken.symbol;
        document.getElementById("search").dispatchEvent(
          new KeyboardEvent("keypress", { key: "Enter" })
        );
      };
      list.appendChild(card);
    });
}

loadTopGainers();
document.getElementById("chain").addEventListener("change", (e) => {
  currentChain = e.target.value;
  loadTopGainers();
});

