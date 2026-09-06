export type CryptoAsset = "BTC" | "ETH" | "USDT" | "USDC"

export interface CryptoNetwork {
  asset: CryptoAsset
  network: string
  address: string
}

// Populate these environment variables when the production receiving addresses are supplied.
// No placeholder or example wallet addresses are shipped with the application.
export const cryptoNetworks: CryptoNetwork[] = [
  { asset: "BTC", network: "Bitcoin", address: import.meta.env.VITE_BTC_DEPOSIT_ADDRESS || "" },
  { asset: "ETH", network: "Ethereum", address: import.meta.env.VITE_ETH_DEPOSIT_ADDRESS || "" },
  { asset: "USDT", network: "TRON (TRC20)", address: import.meta.env.VITE_USDT_TRC20_DEPOSIT_ADDRESS || "" },
  { asset: "USDC", network: "Ethereum (ERC20)", address: import.meta.env.VITE_USDC_ERC20_DEPOSIT_ADDRESS || "" },
]

export function configuredCryptoNetworks() {
  return cryptoNetworks.filter((item) => item.address.trim().length > 0)
}
