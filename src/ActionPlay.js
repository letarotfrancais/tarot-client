import React, { useContext } from 'react'
import SessionContext from './SessionContext'
import Card from './Card'
import Hand from './Hand'
import './CardList.css'
import './Tricks.css'

export default function ActionPlay({ game, handleAction }) {
  const [session] = useContext(SessionContext)
  const { players: users } = game
  const { players, currentPlayer } = game.tarotGame.state
  const currentUser = users.find(u => u.uuid === currentPlayer.id)
  const { hand, tricks } = players.find(p => p.id === session.uuid)
  const isCurrentPlayer = currentPlayer.id === session.uuid

  const handleActionEvent = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cardId = formData.get('card')
    const card = hand.find(c => c.id === cardId)
    handleAction({ card })
  }

  return (
    <div>
      <form onSubmit={event => handleActionEvent(event)}>
        <div className="action">
          {isCurrentPlayer ? <button type="submit">Play selected card</button> : <button disabled>Waiting for {currentUser.displayName} to play</button>}
        </div>
        <Hand cards={hand} />
      </form>

      <div className="tricks card-list">
        {tricks.map((card, index) => <Card key={index} card={card} height="4rem"/>)}
      </div>
    </div>
  )
}