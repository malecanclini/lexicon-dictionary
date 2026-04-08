import styles from './ErrorState.module.css'

export default function ErrorState({ message }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>⚠</div>
      <h3 className={styles.title}>Not found</h3>
      <p className={styles.msg}>{message}</p>
      <p className={styles.hint}>Try checking your spelling or using a related word.</p>
    </div>
  )
}
