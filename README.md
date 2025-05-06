# The Price of Consensus

This server dynamically generates visuals for _the price of consensus_, an Opepen set submission that tracks the live price of unrevealed Opepens at a specific edition level.

Each token's `image` and `animation_url` reflect the current floor price of unrevealed Opepens at a specific edition level. The content updates in real time as listings change.

---

## Concept

Opepen sets are revealed when 80 votes are cast. This project visualizes the real-time ETH cost to buy those votes — based on current floor prices — and presents that cost as an evolving artwork.

- **`/image/:editionId`** returns an SVG showing the current cost.
- **`/animation_url/:editionId`** returns an HTML page with the same content rendered dynamically in a browser.
- **`/full-set`** returns the total price of the full set.

---

## Tech Stack

- TypeScript
- Express
- ESM (`"type": "module"`)
- ts-node with dynamic SVG/HTML generation
- Data pulled live from [https://api.opepen.art/v1/stats](https://api.opepen.art/v1/stats)

---

## Local Development

```bash
git clone https://github.com/yourname/the-price-of-consensus.git
cd the-price-of-consensus
npm install
npm run dev
Runs at: http://localhost:3000
```

## Endpoints

- **`/image/:editionId`** → returns an SVG showing live ETH floor price
- **`/animation_url/:editionId`** → returns HTML-wrapped SVG for animation_url
- **`/full-set`** → returns the total price of the full set

Valid editionIds: 1, 4, 5, 10, 20, 40

## License

MIT
