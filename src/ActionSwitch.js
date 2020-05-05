import React from 'react'
import { useParams } from 'react-router-dom'
import ActionBid from './ActionBid'
import ActionDiscard from './ActionDiscard'
import ActionPlay from './ActionPlay'
import { fetchAPI } from './APIService'
import './Action.css'

export default function ActionSwitch({ gameState }) {
  const { gameId } = useParams()
  const [game, setGame] = gameState
  const [action] = game.tarotGame.actionsSequence

  const handleAction = async (payload) => {
    try {
      setGame(await fetchAPI(`games/${gameId}/action`, { method: 'post', body: { action, payload } }))
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