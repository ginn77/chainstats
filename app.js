let currentChain = "ethereum";

const search = document.getElementById("search");
const info = document.getElementById("token-info");

const chainMap = {
  ethereum: "ethereum",
  bsc: "bsc",
  polygon: "polygon",
  arbitrum: "arbitrum",
  optimism: "optimism"
};

search.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  info.innerHTML = "Loading...";
  const q = search.value;

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/search/?q=${q}&chainIds=${chainMap[currentChain]}`
    );
    const data = await res.json();

    if (!data.pairs?.length) {
      info.innerHTML = "Token not found";
      return;
    }

    const p = data.pairs
      .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];

    loadChart(`${p.chainId.toUpperCase()}:${p.baseToken.symbol}USD`);

    info.innerHTML = `
      <h2>${p.baseToken.symbol}/${p.quoteToken.symbol}</h2>
      💰 Price: $${Number(p.priceUsd).toFixed(6)}<br>
      💧 Liquidity: $${Number(p.liquidity?.usd || 0).toLocaleString()}<br>
      📊 Volume 24h: $${Number(p.volume?.h24 || 0).toLocaleString()}
    `;
  } catch (err) {
    info.innerHTML = "Error loading data";
    console.error(err);
  }
});

function loadChart(symbol) {
  document.getElementById("tv-chart").src =
    `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=15&theme=dark`;
}

async function loadTopGainers() {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/${chainMap[currentChain]}`
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
          <div class="up">▲ ${(p.priceChange.h24).toFixed(2)}%</div>
        `;
        card.onclick = () => {
          search.value = p.baseToken.symbol;
          search.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        };
        list.appendChild(card);
      });
  } catch (e) {
    console.error(e);
  }
}

loadTopGainers();

document.getElementById("chain").addEventListener("change", e => {
  currentChain = e.target.value;
  loadTopGainers();
});
