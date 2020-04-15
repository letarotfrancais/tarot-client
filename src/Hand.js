import React from 'react'
import Card from './Card'
import './CardList.css'
import './Hand.css'

export default function Hand({ cards }) {
  const cardsGroups = Object.values(['HEART', 'CLUB', 'DIAMOND', 'SPADE', 'TRUMP', 'FOOL'].reduce((acc, type) => {
    acc[type] = cards.filter(card => card.id.includes(type))
    return acc
  }, {})).flat()

  return (
    <div>
      <div className="card-list hand" style={{ '--cards-count': cards.length }}>
        {cardsGroups.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
    </div>
  )
}