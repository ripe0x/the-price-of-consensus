import express from "express";
import { getFloorPriceForEdition } from "./floorPrice.js";
import { getPriceSvg, getPricelessSvg } from "./svg.js";

const app = express();
const PORT = 3000;
const validEditionSizes = [1, 4, 5, 10, 20, 40];
const title = "the price of consensus";

app.get("/image/:editionId", (req, res) => {
  (async () => {
    const editionId = parseInt(req.params.editionId);
    if (!validEditionSizes.includes(editionId)) {
      return res.status(400).send("Invalid edition ID");
    }

    const floorPrice = await getFloorPriceForEdition(editionId);

    let svg = getPriceSvg(floorPrice);

    if (floorPrice === "0.0000") {
      svg = getPricelessSvg();
    }

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  })();
});

app.get("/animation_url/:editionId", (req, res) => {
  (async () => {
    const editionId = parseInt(req.params.editionId);
    if (!validEditionSizes.includes(editionId)) {
      return res.status(400).send("Invalid edition ID");
    }

    const editionLevel = editionId;
    const floorPrice = await getFloorPriceForEdition(editionLevel);

    let svg = getPriceSvg(floorPrice);

    if (floorPrice === "0.0000") {
      svg = getPricelessSvg();
    }

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          background: ${floorPrice === "0.0000" ? "black" : "white"};
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        svg {
          width: 100vmin;
          height: 100vmin;
        }
      </style>
    </head>
    <body>
      ${svg}
    </body>
    </html>
  `;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  })();
});

app.get("/full-set", (req, res) => {
  (async () => {
    let totalFloorPrice = 0;
    for (const editionId of validEditionSizes) {
      const floorPrice = await getFloorPriceForEdition(editionId);
      totalFloorPrice += Number(floorPrice) * editionId;
    }

    res.send(totalFloorPrice.toString());
  })();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
