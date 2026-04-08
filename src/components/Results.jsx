import { useRef } from 'react'
import styles from './Results.module.css'

export default function Results({ entry, onSearch }) {
  const audioRef = useRef(null)

  if (!entry) return null

  const phonetic = entry.phonetics?.find(p => p.text)?.text || entry.phonetic || ''
  const audioUrl = entry.phonetics?.find(p => p.audio)?.audio || ''

  const playAudio = () => {
    if (audioRef.current) audioRef.current.pause()
    audioRef.current = new Audio(audioUrl)
    audioRef.current.play()
  }

  return (
    <div className={styles.wrap}>
      {/* Word header */}
      <div className={styles.wordHeader}>
        <div>
          <h1 className={styles.wordTitle}>{entry.word}</h1>
          {phonetic && <div className={styles.phonetic}>{phonetic}</div>}
        </div>
        {audioUrl && (
          <button className={styles.audioBtn} onClick={playAudio} title="Play pronunciation">
            ▶
          </button>
        )}
      </div>

      {/* Meanings */}
      {entry.meanings?.map((meaning, mi) => (
        <MeaningBlock key={mi} meaning={meaning} onSearch={onSearch} />
      ))}

      {/* Source */}
      {entry.sourceUrls?.[0] && (
        <div className={styles.source}>
          <span>Source:</span>{' '}
          <a href={entry.sourceUrls[0]} target="_blank" rel="noopener noreferrer">
            {entry.sourceUrls[0]}
          </a>
        </div>
      )}
    </div>
  )
}

function MeaningBlock({ meaning, onSearch }) {
  return (
    <div className={styles.partBlock}>
      <div className={styles.partLabel}>
        <span className={styles.partName}>{meaning.partOfSpeech}</span>
        <div className={styles.partLine} />
      </div>

      <div className={styles.defsLabel}>Definitions</div>

      {meaning.definitions.slice(0, 5).map((def, i) => (
        <div key={i} className={styles.defItem}>
          <div className={styles.defNum}>{String(i + 1).padStart(2, '0')}.</div>
          <div className={styles.defText}>{def.definition}</div>
          {def.example && (
            <div className={styles.defExample}>{def.example}</div>
          )}
        </div>
      ))}

      {meaning.synonyms?.length > 0 && (
        <TagRow label="Synonyms" words={meaning.synonyms.slice(0, 8)} onSearch={onSearch} color="amber" />
      )}
      {meaning.antonyms?.length > 0 && (
        <TagRow label="Antonyms" words={meaning.antonyms.slice(0, 8)} onSearch={onSearch} color="red" />
      )}
    </div>
  )
}

function TagRow({ label, words, onSearch, color }) {
  return (
    <div className={styles.tagRow}>
      <span className={styles.tagLabel} style={{ color: color === 'red' ? 'var(--red)' : 'var(--muted)' }}>
        {label}
      </span>
      {words.map(w => (
        <button
          key={w}
          className={styles.tag}
          style={color === 'red' ? { borderColor: 'rgba(184,64,64,0.3)', color: 'var(--red)' } : {}}
          onClick={() => onSearch(w)}
        >
          {w}
        </button>
      ))}
    </div>
  )
}
