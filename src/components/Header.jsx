import { useState, useRef } from 'react'
import styles from './Header.module.css'

export default function Header({ onSearch, currentQuery }) {
  const [input, setInput] = useState(currentQuery || '')
  const inputRef = useRef()

  const handleSearch = () => onSearch(input)
  const handleKey = (e) => { if (e.key === 'Enter') handleSearch() }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        Lex<span>icon</span>
      </div>
      <p className={styles.tagline}>English Dictionary &amp; Reference</p>
      <div className={styles.searchWrap}>
        <input
          ref={inputRef}
          className={styles.searchInput}
          type="text"
          placeholder="Search a word…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="off"
          spellCheck={false}
        />
        <button className={styles.searchBtn} onClick={handleSearch} aria-label="Search">
          <SearchIcon />
          Look up
        </button>
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
