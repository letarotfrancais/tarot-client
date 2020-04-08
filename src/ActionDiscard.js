import React, { useContext } from 'react'
import UserContext from './UserContext'
import Card from './Card'

export default function ActionDiscard({ game, handleAction }) {
  const [user] = useContext(UserContext)
  const { players, taker } = game.tarotGame.state
  const { hand } = players.find(p => p.id === user)
  const isTaker = taker.id === user

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
          {hand.map((card, index) => <li key={index}><label><input type="checkbox" name="card" value={card.id} /> <Card card={card} /></label></li>)}
        </ul>

        {isTaker ? <button type="submit">Discard selected cards</button> : `Waiting for ${taker.id} to discard.`}
      </form>
    </div>
  )
}