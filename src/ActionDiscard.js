import React, { useContext } from 'react'
import UserContext from './UserContext'

export default function ActionDiscard({ tarotGame, handleAction }) {
  const [user] = useContext(UserContext)
  const { hand } = tarotGame.state.players.find(p => p.id === user)

  const handleActionEvent = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cards = formData.getAll('card').map(i => hand[i])
    handleAction({ cards })
  }

  return (
    <div>
      <h3>Discard phase</h3>

      <form onSubmit={event => handleActionEvent(event)}>
        <h4>Hand ({hand.length})</h4>
        <ul>
          {hand.map((card, index) => <li key={index}><label><input type="checkbox" name="card" value={index} /> {card.name} </label></li>)}
        </ul>

        <button type="submit">Discard selected cards</button>
      </form>
    </div>
  )
}