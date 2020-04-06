import React, { useContext } from 'react'
import UserContext from './UserContext'

export default function ActionPlay({ game, handleAction }) {
  const [user] = useContext(UserContext)
  const { tarotGame } = game
  const { hand, tricks } = tarotGame.state.players.find(p => p.id === user)
  const { board, currentPlayer } = tarotGame.state
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
      <ul>
       {board.map((card, index) => <li key={index}>{card.color} {card.name}</li>)}
      </ul>

      <form onSubmit={event => handleActionEvent(event)}>
        <h4>Hand ({hand.length})</h4>
        <ul>
          {hand.map((card, index) => <li key={index}><label><input type="radio" name="card" value={index} /> {card.color} {card.name}</label></li>)}
        </ul>

        {isCurrentPlayer ? <button type="submit">Play selected card</button> : `Waiting for ${currentPlayer.id} to play.`}
      </form>

      <h4>Tricks ({tricks.length})</h4>
      <ul>
       {tricks.map((card, index) => <li key={index}>{card.color} {card.name}</li>)}
      </ul>
    </div>
  )
}