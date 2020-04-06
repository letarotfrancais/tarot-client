import React, { useContext } from 'react'
import UserContext from './UserContext'

export default function ActionDiscard({ game, handleAction }) {
  const [user] = useContext(UserContext)
  const { tarotGame } = game
  const { hand } = tarotGame.state.players.find(p => p.id === user)
  const { currentPlayer } = game.tarotGame.state
  const isCurrentPlayer = currentPlayer.id === user

  const handleActionEvent = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cards = formData.getAll('card').map(id => hand.find(card => card.id === id))
    handleAction({ cards })
  }

  return (
    <div>
      <h3>Discard phase</h3>

      <form onSubmit={event => handleActionEvent(event)}>
        <h4>Hand ({hand.length})</h4>
        <ul>
          {hand.map((card, index) => <li key={index}><label><input type="checkbox" name="card" value={card.id} /> {card.color} {card.name} </label></li>)}
        </ul>

        {isCurrentPlayer ? <button type="submit">Discard selected cards</button> : `Waiting for ${currentPlayer.id} to discard.`}
      </form>
    </div>
  )
}