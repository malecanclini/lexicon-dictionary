import styles from './Welcome.module.css'

const EXAMPLES = ['ephemeral', 'serendipity', 'melancholy', 'luminous', 'quixotic', 'solitude']

export default function Welcome({ onSearch }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.bigWord}>lexicon</span>
      <p className={styles.sub}>
        Search any English word to explore its definitions,<br />
        phonetics, usage examples, and synonyms.
      </p>
      <div className={styles.chips}>
        {EXAMPLES.map(w => (
          <button key={w} className={styles.chip} onClick={() => onSearch(w)}>
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}
