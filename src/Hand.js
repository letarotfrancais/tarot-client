import React from 'react'
import Card from './Card'
import './Hand.css'

export default function Hand({ cards }) {
  return (
    <div className="hand">
      {cards.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={index} />  <Card card={card} /></label>)}
    </div>
  )
}