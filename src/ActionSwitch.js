import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from './UserContext'
import ActionBid from './ActionBid'
import ActionDiscard from './ActionDiscard'
import ActionPlay from './ActionPlay'
import './Action.css'

export default function ActionSwitch({ gameState }) {
  const [user] = useContext(UserContext)
  const { gameId } = useParams()
  const [game, setGame] = gameState
  const [action] = game.tarotGame.actionsSequence

  const handleAction = async (payload) => {
    const data = { action, payload }
    const body = JSON.stringify(data)
    try {
      const res = await fetch(`http://localhost:8080/games/${gameId}/action`, { method: 'post', headers: { user, 'Content-Type': 'application/json' },  body })
      setGame(await res.json())
    } catch (e) {
      console.log(e);
    }

  }

  switch (action) {
    case 'bid':
      return <ActionBid game={game} handleAction={handleAction} />
    case 'discard':
      return <ActionDiscard game={game} handleAction={handleAction} />
    case 'play':
      return <ActionPlay game={game} handleAction={handleAction} />
    default:
      return 'Action not recognized'
  }
}