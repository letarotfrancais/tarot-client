import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import SessionContext from './SessionContext'
import ActionBid from './ActionBid'
import ActionDiscard from './ActionDiscard'
import ActionPlay from './ActionPlay'
import './Action.css'

export default function ActionSwitch({ gameState }) {
  const [session] = useContext(SessionContext)
  const { gameId } = useParams()
  const [game, setGame] = gameState
  const [action] = game.tarotGame.actionsSequence

  const handleAction = async (payload) => {
    const data = { action, payload }
    const body = JSON.stringify(data)
    try {
      const res = await fetch(`https://api.letarotfrancais.com/games/${gameId}/action`, { method: 'post', headers: { authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' },  body })
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