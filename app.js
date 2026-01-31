const searchInput = document.getElementById("search");
const resultBox = document.getElementById("result");

async function searchToken(symbol) {
  resultBox.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${symbol}`
    );
    const data = await res.json();

    if (data.coins.length === 0) {
      resultBox.innerHTML = "Token not found";
      return;
    }

    const coin = data.coins[0];

    const priceRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&include_market_cap=true`
    );
    const priceData = await priceRes.json();

    resultBox.innerHTML = `
      <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
      <p>💰 Price: $${priceData[coin.id].usd}</p>
      <p>🏦 Market Cap: $${priceData[coin.id].usd_market_cap.toLocaleString()}</p>
    `;
  } catch (e) {
    resultBox.innerHTML = "Error loading data";
  }
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchToken(e.target.value);
  }
});
