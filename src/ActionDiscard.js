import React, { useContext } from 'react'
import UserContext from './UserContext'
import Card from './Card'
import './CardList.css'

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
        <div className="card-list">
          {hand.map((card, index) => <label className="selectable-card-container"><input key={index} type="checkbox" name="card" value={card.id} /> <Card card={card} /></label>)}
        </div>

        {isTaker ? <button type="submit">Discard selected cards</button> : <button disabled>Waiting for {taker.id} to discard</button>}
      </form>
    </div>
  )
}