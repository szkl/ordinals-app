export const getOrdinalsURL = (address: string, limit: number = 5, offset: number = 0) =>
  `https://api.xverse.app/v1/address/${address}/ordinal-utxo?limit=${limit}&offset=${offset}`

export const getInscriptionDetailURL = (address: string, inscriptionId: string) =>
  `https://api.xverse.app/v1/address/${address}/ordinals/inscriptions/${inscriptionId}`

export const getInscriptionContentURL = (inscriptionId: string) =>
  `https://ord.xverse.app/content/${inscriptionId}`
