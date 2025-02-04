import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import SessionContext from './SessionContext'
import { fetchAPI } from './APIService'
import './Games.css'

export default function Games() {
  const [session] = useContext(SessionContext)
  const [games, setGames] = useState(null)

  const fetchGames = async () => {
    try {
      setGames(await fetchAPI('games'))
    } catch(e) {
      console.log('Something went wrong while attempting to get games', e)
    }
  }

  useEffect(() => {
    fetchGames()
    const intervalId = setInterval(() => fetchGames(), 3000)
    return () => clearTimeout(intervalId)
  }, [])

  // loading state
  if (!games) {
    return (
      <div>
        <h2>Games</h2>
        <p>Loading...</p>
      </div>
    )
  }

  // empty state
  if (games.length === 0) {
    return (
      <div className="games">
        <p>No game created yet.</p>
        <Link to="/games/new">Create a new game</Link>
      </div>
    )
  }

  return (
    <div className="games">
      <h2>Games your playing in</h2>
      <ul>
        {games.filter(g => g.status === 'started').filter(g => g.players.some(p => p.uuid === session.uuid)).map(({ id, owner, players}) => (
          <li key={id}>
            <Link to={{ pathname: `/games/${id}` }} >Created by {owner.displayName}, joined by {players.filter(p => p.uuid !== owner.uuid).map(p => p.displayName).join(', ')}</Link>
          </li>
        ))}
      </ul>
      <h2>Games waiting for players</h2>
      <ul>
        {games.filter(game => game.status === 'created').map(({ id, owner, players}) => (
          <li key={id}>
            <Link to={{ pathname: `/games/${id}` }} >Created by {owner.displayName}, joined by {players.filter(p => p.uuid !== owner.uuid).map(p => p.displayName).join(', ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}