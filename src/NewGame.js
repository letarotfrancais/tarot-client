import React, {
  useContext,
  useState,
  useEffect
} from 'react'
import { Redirect } from 'react-router-dom'
import SessionContext from './SessionContext'
import './NewGame.css'

export default function NewGame() {
  const [session] = useContext(SessionContext)
  const [clicked, setClicked] = useState(false)
  const [gameId, setGameId] = useState('')
  useEffect(() => {
    if (clicked) {
      const createGame = async () => {
        try {
          let rest = await fetch('http://api.tarot.toncar.fr/games', { method: 'post', headers: { authorization: `Bearer ${session.token}` } })
          let { id } = await rest.json()
          setGameId(id)
        } catch(e) {
          console.log('Something went wrong while attempting to create a new game', e)
        }
      }
      createGame()
    }
  }, [clicked]);

  if (gameId) {
    return (
      <Redirect to={`/games/${gameId}`} />
    )
  }

  return (
    <div className="new-game">
      <h2>New game</h2>
      <p>You'll create a new game and join it as {session.displayName}.</p>
      <button type="button" onClick={() => setClicked(true)}>Create new game</button>
    </div>
  )
}
