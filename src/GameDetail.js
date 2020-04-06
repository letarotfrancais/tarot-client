import React, {
  useState,
  useContext,
  useEffect
} from 'react'
import {
  useParams,
  Redirect
} from 'react-router-dom'
import UserContext from './UserContext'

export default function GameDetail({ gameState }) {
  const [user] = useContext(UserContext)
  const { gameId } = useParams()
  const [game, setGame] = gameState
  const [joined, setJoined] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (joined === 'pending') {
      const joinGame = async () => {
        try {
          const res = await fetch(`http://localhost:8080/games/${gameId}/join`, { headers: { user } })
          setGame(await res.json())
          setJoined('done')
        } catch(e) {
          console.log('Something went wrong while attempting to join game', gameId, e)
        }
      }
      joinGame()
    }
  }, [joined])

  useEffect(() => {
    if (deleted === 'pending') {
      const deleteGame = async () => {
        try {
          fetch(`http://localhost:8080/games/${gameId}`, { method: 'delete', headers: { user } })
          setDeleted('done')
        } catch(e) {
          console.log('Something went wrong while attempting to delete game', gameId, e)
        }
      }
      deleteGame()
    }
  }, [deleted])

  useEffect(() => {
    if (started === 'pending') {
      const startGame = async () => {
        try {
          const res = fetch(`http://localhost:8080/games/${gameId}/start`, { headers: { user } })
          setGame(await res.json())
          setStarted('done')
        } catch(e) {
          console.log('Something went wrong while attempting to start game', gameId, e)
        }
      }
      startGame()
    }
  }, [started])

  if (deleted === 'done') {
    return (
      <Redirect to='/games' />
    )
  }

  if (!game.id) {
    return (
      <div>
        <h2>Game detail</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const joinAction = !game.players.includes(user) ? <button type="button" onClick={() => setJoined('pending')}>Join this game</button> : 'You are a member of this game.'
  const deleteAction = game.owner === user ? <button type="button" onClick={() => setDeleted('pending')}>Delete this game</button> : ''
  const startAction = game.owner === user ?  <button type="button" onClick={() => setStarted('pending')}>Start this game</button> : ''

  return (
    <div>
      <h2>Game detail</h2>
      <p>Owner: {game.owner}</p>
      <p>{deleteAction}</p>
      <p>{joinAction}</p>
      <p>{startAction}</p>
      <h3>Players</h3>
      <ul>
        {game.players.map((player, index) => {
          return <li key={index}>{player}</li>
        })}
      </ul>
    </div>
  )
}
