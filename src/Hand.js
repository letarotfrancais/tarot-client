import React from 'react'
import Card from './Card'
import './CardList.css'

export default function Hand({ cards }) {
  return (
    <div className="card-list">
      {cards.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={index} /><Card card={card} /></label>)}
    </div>
  )
}