import React from 'react'
import Card from './Card'
// import { groupBy } from 'lodash'
import './CardList.css'

export default function Hand({ cards }) {
  const cardsGroups = ['FOOL', 'TRUMP', 'CLUB', 'DIAMOND', 'HEART', 'SPADE'].reduce((acc, type) => {
    acc[type] = cards.filter(card => card.id.includes(type))
    return acc
  }, {})
  return (
    <div>
      <div className="card-list">
        {cardsGroups.FOOL.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
      <div className="card-list">
        {cardsGroups.TRUMP.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
      <div className="card-list">
        {cardsGroups.CLUB.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
      <div className="card-list">
        {cardsGroups.DIAMOND.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
      <div className="card-list">
        {cardsGroups.HEART.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
      <div className="card-list">
        {cardsGroups.SPADE.map((card, index) => <label key={index} className="selectable-card-container"><input type="radio" name="card" value={card.id} /><Card card={card} /></label>)}
      </div>
    </div>
  )
}