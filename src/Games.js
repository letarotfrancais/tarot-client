import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Games() {
  const [timer, setTimer] = useState(null)
  const [games, setGames] = useState(null)

  const fetchGames = async () => {
    try {
      const res = await fetch('http://localhost:8080/games')
      setGames(await res.json())
    } catch(e) {
      console.log('Something went wrong while attempting to get games', e)
    }
    clearTimeout(timer)
    setTimer(setTimeout(fetchGames, 3000))
  }

  useEffect(() => {
    fetchGames()
  }, [])

  if (!games) {
    return (
      <div>
        <h2>Games</h2>
        <p>Loading...</p>
      </div>
    )
  }


  if (games.length === 0) {
    return (
      <div>
        <p>No game created yet.</p>
        <Link to="/games/new">Create a new game</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map(({ id }) => (
          <li key={id}>
            <Link to={{ pathname: `/games/${id}` }} >{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}