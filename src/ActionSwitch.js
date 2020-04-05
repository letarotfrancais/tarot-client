import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from './UserContext'
import ActionBid from './ActionBid'
import ActionDiscard from './ActionDiscard'
import ActionPlay from './ActionPlay'

export default function ActionSwitch({ action, tarotGame }) {
  const [user] = useContext(UserContext)
  const { gameId } = useParams()

  const handleAction = async (payload) => {
    const data = { action, payload }
    const body = JSON.stringify(data)
    await fetch(`http://localhost:8080/games/${gameId}/action`, { method: 'post', headers: { user, 'Content-Type': 'application/json' },  body })
  }

  switch (action) {
    case 'bid':
      return <ActionBid tarotGame={tarotGame} handleAction={handleAction} />
    case 'discard':
      return <ActionDiscard tarotGame={tarotGame} handleAction={handleAction} />
    case 'play':
      return <ActionPlay tarotGame={tarotGame} handleAction={handleAction} />
    default:
      return 'Action not recognized'
  }
}