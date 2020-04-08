import React, { useContext } from 'react'
import UserContext from './UserContext'
import Card from './Card'
import Hand from './Hand'
import './CardList.css'

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
      <div className="card-list">
        {board.map((card, index) => <Card key={index} card={card} />)}
      </div>

      <form onSubmit={event => handleActionEvent(event)}>
        <h4>Hand ({hand.length})</h4>
        <Hand cards={hand} />
        <div className="action">
          {isCurrentPlayer ? <button type="submit">Play selected card</button> : <button disabled>Waiting for {currentPlayer.id} to play</button>}
        </div>
      </form>

      <h4>Tricks ({tricks.length})</h4>
      <div className="card-list">
        {tricks.map((card, index) => <Card key={index} card={card} />)}
      </div>
    </div>
  )
}