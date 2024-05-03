import { useEffect, useState } from 'react'

import back from './back.svg'
import styles from './InscriptionDetail.module.css'

import { getInscriptionContentURL, getInscriptionDetailURL } from '../../utils/ordinals'

type InscriptionDetailProps = {
  address: string
  inscriptionId: string
  setSelectedInscriptionId: (id: string) => void
}

type InscriptionDetails = {
  number: number
  id: string
  address: string
  value: number
  mime_type: string
  content_length: number
  location: string
  genesis_address: string
}

export default function InscriptionDetail(
  { address,
    inscriptionId,
    setSelectedInscriptionId,
  }: InscriptionDetailProps
) {
  const [details, setDetails] = useState<InscriptionDetails | null>(null)

  useEffect(() => {
    const fetchInscriptionDetails = async () => {
      const response = await fetch(getInscriptionDetailURL(address, inscriptionId))
      const body = await response.json()
      setDetails(body)
    }

    fetchInscriptionDetails()

  }, [address, inscriptionId])

  if (!details) return null

  return (
    <section className={styles.inscriptionDetail}>
      <header>
        <img src={back} alt="back" onClick={() => setSelectedInscriptionId('')} />
        <span>Details</span>
      </header>
      <div className={styles.content}>
        <Content inscriptionId={inscriptionId} mimeType={details.mime_type} />
      </div>
      <div className={styles.details}>
        <header className={styles.number}>
          Inscription {details.number}
        </header>
        <div className={styles.meta}>
          <div>
            <label>Inscription Id</label>
            <span> {details.id}</span>
          </div>
          <div>
            <label>Owner Address</label>
            <span>{details.address}</span>
          </div>
        </div>
        <div className={styles.attributes}>
          <header>Attributes</header>
          <div>
            <div className={styles.attribute}>
              <label>Output Value</label>
              <span>{details.value}</span>
            </div>
            <div className={styles.attribute}>
              <label>Content Type</label>
              <span>{details.mime_type}</span>
            </div>
            <div className={styles.attribute}>
              <label>Content Length</label>
              <span>{details.content_length} bytes</span>
            </div>
            <div className={styles.attribute}>
              <label>Location</label>
              <span>{details.location.slice(0, 13)}...{details.location.slice(-19)}</span>
            </div>
            <div className={styles.attribute}>
              <label>Genesis Transaction</label>
              <span>{details.genesis_address.slice(0, 13)}...{details.genesis_address.slice(-15)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type ContentProps = {
  inscriptionId: string
  mimeType: string
}

function Content({ inscriptionId, mimeType }: ContentProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchInscriptionContent = async () => {
      const response = await fetch(getInscriptionContentURL(inscriptionId))
      const body = await response.text()
      setContent(body)
    }

    if (!mimeType.startsWith('image'))
      fetchInscriptionContent()
  })

  if (mimeType.startsWith('image')) {
    return <img src={getInscriptionContentURL(inscriptionId)} alt="content" />
  } else {
    return <span>{content}</span>
  }
}
