import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import Welcome from './components/Welcome.jsx'
import Loading from './components/Loading.jsx'
import ErrorState from './components/ErrorState.jsx'
import Results from './components/Results.jsx'

export default function App() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('welcome')
  const [data, setData] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const search = useCallback(async (word) => {
    const w = word.trim()
    if (!w) return
    setQuery(w)
    setStatus('loading')
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`)
      if (!res.ok) {
        setErrorMsg(`"${w}" was not found in the dictionary.`)
        setStatus('error')
        return
      }
      const json = await res.json()
      setData(json[0])
      setStatus('results')
    } catch {
      setErrorMsg('Could not connect to the dictionary. Check your internet connection.')
      setStatus('error')
    }
  }, [])

  return (
    <>
      <Header onSearch={search} currentQuery={query} />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {status === 'welcome' && <Welcome onSearch={search} />}
        {status === 'loading' && <Loading />}
        {status === 'error'   && <ErrorState message={errorMsg} />}
        {status === 'results' && <Results entry={data} onSearch={search} />}
      </main>
    </>
  )
}
