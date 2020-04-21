import React, {
  useState,
  useContext,
  useEffect
} from 'react'
import {
  useParams,
  Redirect
} from 'react-router-dom'
import SessionContext from './SessionContext'
import './GameDetail.css'

export default function GameDetail({ gameState }) {
  const [session] = useContext(SessionContext)
  const { gameId } = useParams()
  const [game, setGame] = gameState
  const [joined, setJoined] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (joined === 'pending') {
      const joinGame = async () => {
        try {
          const res = await fetch(`http://api.tarot.toncar.fr/games/${gameId}/join`, { headers: { authorization: `Bearer ${session.token}` } })
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
          fetch(`http://api.tarot.toncar.fr/games/${gameId}`, { method: 'delete', headers: { authorization: `Bearer ${session.token}` } })
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
          const res = fetch(`http://api.tarot.toncar.fr/games/${gameId}/start`, { headers: { authorization: `Bearer ${session.token}` } })
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
      <div className="game-detail">
        <h2>Game detail</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const joinAction = !game.players.some(p => p.uuid === session.uuid) ? <button type="button" onClick={() => setJoined('pending')}>Join this game</button> : 'You are a member of this game.'
  const deleteAction = game.owner.uuid === session.uuid ? <button type="button" onClick={() => setDeleted('pending')}>Delete this game</button> : ''
  const startAction = game.owner.uuid === session.uuid ?  <button type="button" onClick={() => setStarted('pending')}>Start this game</button> : ''

  return (
    <div className="game-detail">
      <h2>Game detail</h2>
      <p>Owner: {game.owner.displayName}</p>
      <p>{deleteAction}</p>
      <p>{joinAction}</p>
      <p>{startAction}</p>
      <h3>Players</h3>
      <ul>
        {game.players.map((player, index) => {
          return <li key={index}>{player.displayName}</li>
        })}
      </ul>
    </div>
  )
}
