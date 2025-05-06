const getSvg = ({
  text,
  textColor = "black",
  backgroundColor = "white",
}: {
  text: string;
  textColor?: string;
  backgroundColor?: string;
}): string => {
  return `
    <svg width="2000" height="2000" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          text { font-family: Courier, "Courier New", monospace, sans-serif; font-size: 20px; fill: ${textColor}; font-weight: normal; }
          rect { fill: ${backgroundColor}; }
        </style>
      </defs>
      <rect width="100%" height="100%" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${text}</text>
    </svg>
  `;
};

export const getPriceSvg = (floorPrice: string) =>
  getSvg({ text: `${floorPrice} ETH` });
export const getPricelessSvg = () =>
  getSvg({ text: "priceless", textColor: "white", backgroundColor: "black" });
