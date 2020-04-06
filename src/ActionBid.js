import React, { useContext } from 'react'
import UserContext from './UserContext'

export default function ActionBid({ game, handleAction }) {
  const [user] = useContext(UserContext)
  const contracts = ['PASS', 'TAKE', 'GUARD']
  const { tarotGame } = game
  const { hand } = tarotGame.state.players.find(p => p.id === user)
  const { currentPlayer } = game.tarotGame.state
  const isCurrentPlayer = currentPlayer.id === user

  const handleActionEvent = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const contract = formData.get('contract')
    handleAction({ contract })
  }

  return (
    <div>
      <h3>Bidding phase</h3>

      <h4>Hand ({hand.length})</h4>
      <ul>
        {hand.map((card, index) => <li key={index}>{card.color} {card.name}</li>)}
      </ul>

      <form onSubmit={event => handleActionEvent(event)}>
        <select name="contract">
          {contracts.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {isCurrentPlayer ? <button type="submit">Place bid</button> : `Waiting for ${currentPlayer.id} to bid.`}
      </form>
    </div>
  )
}