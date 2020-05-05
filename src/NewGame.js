import React, {
  useContext,
  useState,
  useEffect
} from 'react'
import { Redirect } from 'react-router-dom'
import SessionContext from './SessionContext'
import { fetchAPI } from './APIService'
import './NewGame.css'

export default function NewGame() {
  const [session] = useContext(SessionContext)
  const [clicked, setClicked] = useState(false)
  const [gameId, setGameId] = useState('')
  useEffect(() => {
    if (clicked) {
      const createGame = async () => {
        try {
          let { id } = await fetchAPI(`games`, { method: 'post' })
          setGameId(id)
        } catch(e) {
          console.log('Something went wrong while attempting to create a new game', e)
        }
      }
      createGame()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
