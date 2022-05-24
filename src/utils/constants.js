export const networkConfigs = {
  0x89: [
    {
      chainId: "0x89",
      chainName: "Matic",
      nativeCurrency: {
        name: "Matic",
        symbol: "Matic",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  ],
  0x13881: [
    {
      chainId: "0x13881",
      chainName: "Polygon Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  ],
};

export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(-5)}`;
