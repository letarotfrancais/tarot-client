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

export default function GameDetail() {
  const [user] = useContext(UserContext)
  const { gameId } = useParams()
  const [game, setGame] = useState({})
  const [joined, setJoined] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        let rest = await fetch(`http://localhost:8080/games/${gameId}`, { headers: { user } })
        setGame(await rest.json())
      } catch(e) {
        console.log('Something went wrong while attempting to get a game`s details', e)
      }
    }
    fetchGame()
  }, []);

  useEffect(() => {
    if (joined) {
      const joinGame = async () => {
        try {
          let rest = await fetch(`http://localhost:8080/games/${gameId}/join`, { method: 'post', headers: { user } })
          setGame(await rest.json())
        } catch(e) {
          console.log('Something went wrong while attempting to join a game', e)
        }
      }
      joinGame()
    }
  }, [joined]);

  useEffect(() => {
    if (deleted === 'pending') {
      const joinGame = async () => {
        try {
          fetch(`http://localhost:8080/games/${gameId}`, { method: 'delete', headers: { user } })
          setDeleted('done')
        } catch(e) {
          console.log('Something went wrong while attempting to join a game', e)
        }
      }
      joinGame()
    }
  }, [deleted]);

  if (deleted === 'done') {
    return (
      <Redirect to='/games' />
    )
  }

  if (!game.id) {
    return (
      <div>
      <h2>Games</h2>
      <p>Loading...</p>
    </div>
    )
  }

  const joinAction = !game.players.includes(user) ? <button type="button" onClick={() => setJoined(true)}>Join this game</button> : 'You are a member of this game.'
  const deleteAction = game.owner === user ? <button type="button" onClick={() => setDeleted('pending')}>Delete this game</button> : ''

  return (
    <div>
      <h2>Game detail</h2>
      <p>Owner: {game.owner}</p>
      <p>{deleteAction}</p>
      <p>{joinAction}</p>
      <h3>Players</h3>
      <ul>
        {game.players.map((player, index) => {
          return <li key={index}>{player}</li>
        })}
      </ul>
    </div>
  )
}
