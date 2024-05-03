import { useState } from 'react'

import styles from './LookUp.module.css'

type LookUpProps = {
  onSubmit: (address: string) => void
}

export default function LookUp({ onSubmit }: LookUpProps) {
  const [address, setAddress] = useState('')
  return (
    <section className={styles.lookup}>
      <header>
        Ordinal Inscription Lookup
      </header>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(address)
      }}>
        <label>Owner Bitcoin Address:</label>
        <input
          type="text"
          name='lookupAddress'
          onChange={(e) => setAddress(e.target.value)}
          title='Bitcoin Address' />
        <button type='submit'>Look up</button>
      </form>
    </section>
  )
}
