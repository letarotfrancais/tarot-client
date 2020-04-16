import React, { useContext } from 'react'
import SessionContext from './SessionContext'
import Card from './Card'
import './CardList.css'
import './Hand.css'

export default function ActionDiscard({ game, handleAction }) {
  const [session] = useContext(SessionContext)
  const { players, taker } = game.tarotGame.state
  const { players: users } = game
  const takerUser = users.find(u => u.uuid === taker.id)
  const { hand } = players.find(p => p.id === session.uuid)
  const isTaker = taker.id === session.uuid

  const handleActionEvent = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cards = formData.getAll('card').map(id => hand.find(card => card.id === id))
    handleAction({ cards })
  }

  return (
    <div>
      <form onSubmit={event => handleActionEvent(event)}>
        <div className="action">
          {isTaker ? <button type="submit">Discard selected cards</button> : <button disabled>Waiting for {takerUser.displayName} to discard</button>}
        </div>
        <div className="hand card-list">
          {hand.map((card, index) => <label className="selectable-card-container" key={index}><input type="checkbox" name="card" value={card.id} /> <Card card={card} /></label>)}
        </div>
      </form>
    </div>
  )
}