import React, { useContext } from 'react'
import UserContext from './UserContext'
import Card from './Card'

export default function ActionBid({ game, handleAction }) {
  const [user] = useContext(UserContext)
  const contracts = ['PASS', 'TAKE', 'GUARD']
  const { players, currentPlayer } = game.tarotGame.state
  const { hand } = players.find(p => p.id === user)
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
      {hand.map((card, index) => <Card key={index} card={card} />)}

      <form onSubmit={event => handleActionEvent(event)}>
        <select name="contract">
          {contracts.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {isCurrentPlayer ? <button type="submit">Place bid</button> : `Waiting for ${currentPlayer.id} to bid.`}
      </form>
    </div>
  )
}