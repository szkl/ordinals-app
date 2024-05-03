export type Inscription = {
  id: string
  offset: number
  content_type: string
}

export type UTXO = {
  inscriptions: Array<Inscription>
}
