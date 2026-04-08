import styles from './Loading.module.css'

export default function Loading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
      <p className={styles.text}>Searching the lexicon…</p>
    </div>
  )
}
