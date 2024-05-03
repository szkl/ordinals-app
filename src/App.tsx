import { useCallback, useEffect, useRef, useState } from 'react'

import styles from './App.module.css'

import LookUp from './components/LookUp'
import InscriptionList from './components/InscriptionList'
import InscriptionDetail from './components/InscriptionDetail'

import { getOrdinalsURL } from './utils/ordinals'

import type { Inscription, UTXO } from './types'

type OrdinalUTXOResponse = {
  limit: number
  offset: number
  total: number
  results: Array<UTXO>
}

const ORDINALS_PAGE_LIMIT = 5

export default function App() {
  const [lookupAddress, setLookupAddress] = useState('')
  const [inscriptions, setInscriptions] = useState<Array<Inscription>>([])
  const [selectedInscriptionId, setSelectedInscriptionId] = useState('')

  const total = useRef(0)
  const offset = useRef(0)

  const fetchInscriptions = useCallback(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchOrdinals = async () => {
      const response = await fetch(getOrdinalsURL(lookupAddress, ORDINALS_PAGE_LIMIT, offset.current), { signal })
      const body: OrdinalUTXOResponse = await response.json()
      total.current = body.total
      offset.current = offset.current + body.results.length
      setInscriptions(current =>
        current.concat(body.results.flatMap(({ inscriptions }) => inscriptions))
      )
    }

    fetchOrdinals()

    return () => controller.abort()
  }, [lookupAddress])

  useEffect(() => {
    if (!lookupAddress) return
    return fetchInscriptions()
  }, [lookupAddress, fetchInscriptions])

  useEffect(() => {
    if (!lookupAddress) setInscriptions([])
  }, [lookupAddress])

  return (
    <div className={styles.App}>
      {selectedInscriptionId
        ? <InscriptionDetail
          address={lookupAddress}
          inscriptionId={selectedInscriptionId}
          setSelectedInscriptionId={setSelectedInscriptionId}
        />
        : <>
          <LookUp onSubmit={setLookupAddress} />
          {inscriptions.length > 0 &&
            <InscriptionList
              key={lookupAddress}
              inscriptions={inscriptions}
              setSelectedInscriptionId={setSelectedInscriptionId}
            />}
          {offset.current < total.current &&
            <button
              type='button'
              className={styles.loadMore}
              onClick={fetchInscriptions}
            >
              Load More
            </button>
          }
        </>}
    </div>
  )
}
