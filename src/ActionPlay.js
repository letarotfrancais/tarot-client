import React, { useContext } from 'react'
import SessionContext from './SessionContext'
import Card from './Card'
import Hand from './Hand'
import './CardList.css'

export default function ActionPlay({ game, handleAction }) {
  const [session] = useContext(SessionContext)
  const { players, currentPlayer } = game.tarotGame.state
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
          {isCurrentPlayer ? <button type="submit">Play selected card</button> : <button disabled>Waiting for {currentPlayer.id} to play</button>}
        </div>
        <Hand cards={hand} />
      </form>

      <h4>Tricks ({tricks.length / players.length})</h4>
      <div className="card-list">
        {tricks.map((card, index) => <Card key={index} card={card} />)}
      </div>
    </div>
  )
}