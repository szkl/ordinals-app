import link from './link.svg'
import styles from './InscriptionList.module.css'

import { Inscription } from '../../types'

type InscriptionListProps = {
  inscriptions: Array<Inscription>
  setSelectedInscriptionId: React.Dispatch<React.SetStateAction<string>>
}

export default function InscriptionList(
  { inscriptions, setSelectedInscriptionId }: InscriptionListProps
) {
  return (
    <section className={styles.inscriptionList}>
      <header>Results</header>
      <ul>
        {inscriptions.map(i => {
          return (
            <li key={i.id}>
              <button type="button" onClick={e => setSelectedInscriptionId(i.id)}>
                <span className={styles.title}>Inscription {i.id.slice(0, 8)}</span>
                <img alt="link" src={link} />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
