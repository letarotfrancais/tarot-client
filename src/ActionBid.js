import React, { useContext } from 'react'
import SessionContext from './SessionContext'
import Card from './Card'

export default function ActionBid({ game, handleAction }) {
  const [session] = useContext(SessionContext)
  const contracts = ['PASS', 'TAKE', 'GUARD']
  const { players, currentPlayer } = game.tarotGame.state
  const { hand } = players.find(p => p.id === session.uuid)
  const isCurrentPlayer = currentPlayer.id === session.uuid

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
        {isCurrentPlayer ? <button type="submit">Place bid</button> : <button disabled>Waiting for {currentPlayer.id} to bid</button>}
      </form>
    </div>
  )
}