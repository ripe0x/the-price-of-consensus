export async function getFloorPriceForEdition(
  editionLevel: number
): Promise<string> {
  const res = await fetch("https://api.opepen.art/v1/stats");
  const data = await res.json();

  const wei = data.markets.floor.unrevealedEditions[editionLevel.toString()];

  if (!wei) return "0.0000";

  const eth = Number(BigInt(wei) / 10n ** 14n) / 10000; // 4 decimal precision
  return eth.toFixed(4);
}
