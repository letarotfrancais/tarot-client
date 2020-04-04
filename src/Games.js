import React from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from './utils'

export default function Games() {
  const res = useFetch('http://localhost:8080/games')

  if (!res.response) {
    return (
      <div>
        <h2>Games</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const games = res.response

  if (games.length === 0) {
    return (
      <div>
        <p>No game created yet.</p>
        <Link to="/games/new">Create a game</Link>
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