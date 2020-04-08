import React, { useContext } from 'react'
import UserContext from './UserContext'
import Card from './Card'
import Hand from './Hand'

export default function ActionPlay({ game, handleAction }) {
  const [user] = useContext(UserContext)
  const { players, currentPlayer, board } = game.tarotGame.state
  const { hand, tricks } = players.find(p => p.id === user)
  const isCurrentPlayer = currentPlayer.id === user

  const handleActionEvent = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cardIndex = formData.get('card')
    const card = hand[cardIndex]
    handleAction({ card })
  }

  return (
    <div>
      <h3>Play phase</h3>

      <h4>Board ({board.length})</h4>
      {board.map((card, index) => <Card key={index} card={card} />)}

      <form onSubmit={event => handleActionEvent(event)}>
        <h4>Hand ({hand.length})</h4>
        <Hand cards={hand} />
        <div className="action">
          {isCurrentPlayer ? <button type="submit">Play selected card</button> : `Waiting for ${currentPlayer.id} to play.`}
        </div>
      </form>

      <h4>Tricks ({tricks.length})</h4>
      {tricks.map((card, index) => <Card key={index} card={card} />)}
    </div>
  )
}