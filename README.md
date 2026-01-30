# ChainStats – Crypto Analytics Website (GitHub Pages)

Modern crypto analytics dashboard inspired by DexCheck.

---

## 🚀 Tech Stack (100% Free)

* **Vite + React** (fast & lightweight)
* **CoinGecko API** (price & market data)
* **DexScreener API** (DEX pairs & volume)
* **Chart.js** (price charts)
* **GitHub Pages** (free hosting)

---

## 📁 Project Structure

```
chainstats/
├─ index.html
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ api.js
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Search.jsx
│  │  ├─ PriceCard.jsx
│  │  └─ Chart.jsx
│  └─ styles.css
├─ package.json
└─ vite.config.js
```

---

## 🧠 Features

* 🔎 Token search (CoinGecko)
* 💹 Live price & market cap
* 📊 Price chart (7D)
* 🌙 Dark mode (default)
* ⚡ Fast & modern UI

---

## 🧩 API Setup (Free, No Key Required)

### CoinGecko (Price & Token Info)

```
https://api.coingecko.com/api/v3/coins/{id}
```

### DexScreener (DEX Data)

```
https://api.dexscreener.com/latest/dex/search?q={symbol}
```

---

## 🧪 Sample API Code (api.js)

```js
export async function getToken(id) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
  return res.json()
}

export async function searchDex(symbol) {
  const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${symbol}`)
  return res.json()
}
```

---

## 🎨 UI Style (Modern Minimal)

* Dark background
* Clean cards
* Simple charts
* No clutter

Color palette:

* Background: #0d1117
* Card: #161b22
* Accent: #3fb950

---

## 🚀 Deploy to GitHub Pages

```bash
npm install
npm run build
npm run deploy
```

Website live at:

```
https://USERNAME.github.io/chainstats
```

---

## 🔜 Next Enhancements

* Multi‑chain filter
* Wallet analytics
* Trending tokens
* Whale trades

---

## 🧩 Simple Version (1 Page)

### 📄 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ChainStats</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { background:#0d1117; color:#fff; font-family:Arial; margin:0; padding:20px }
    input { padding:10px; width:250px; border-radius:6px; border:none }
    button { padding:10px 16px; margin-left:8px; border:none; border-radius:6px; background:#3fb950; color:#000; cursor:pointer }
    .card { background:#161b22; padding:20px; border-radius:10px; margin-top:20px }
  </style>
</head>
<body>
  <h1>ChainStats</h1>
  <p>Simple Crypto Analytics</p>

  <input id="token" placeholder="bitcoin / ethereum" />
  <button onclick="loadToken()">Search</button>

  <div id="info" class="card"></div>
  <canvas id="chart" height="120"></canvas>

<script>
let chart
async function loadToken() {
  const id = document.getElementById('token').value
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
  const data = await res.json()

  document.getElementById('info').innerHTML = `<h2>${id.toUpperCase()}</h2>`

  const prices = data.prices.map(p => p[1])
  const labels = data.prices.map((_,i)=>i)

  if(chart) chart.destroy()
  chart = new Chart(document.getElementById('chart'), {
    type:'line',
    data:{ labels, datasets:[{ data:prices, borderColor:'#3fb950' }]},
    options:{ plugins:{ legend:{ display:false } } }
  })
}
</script>
</body>
</html>
```

---

## 🚀 Deploy (GitHub Pages)

1. Create repo `chainstats`
2. Upload `index.html`
3. Settings → Pages → main / root
4. Done 🎉

Live URL:

```
https://USERNAME.github.io/chainstats
```
