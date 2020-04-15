import React from 'react'
import './Card.css'

export default function Card({ card, height }) {
  if (!card) {
    return <div className="card hideout placeholder" style={{ '--height': '7rem' }}><span>⌛</span></div>
  }

  const abbr = isNaN(parseInt(card.name)) ? card.name[0] : parseInt(card.name)
  const suitPropsMap = {
    'HEART': { color: 'red', symbol: '♥' },
    'SPADE': { color: 'black', symbol: '♠' },
    'DIAMOND': { color: 'red', symbol: '♦' },
    'CLUB': { color: 'black', symbol: '♣' }
  }

  const color = suitPropsMap[card.color] ? suitPropsMap[card.color].color : 'black';
  const symbol = suitPropsMap[card.color] ? suitPropsMap[card.color].symbol : abbr
  const theme = 'hideout'
  const className = ['card', theme].join(' ')
  const style = { '--height': height || '7rem', color }

  return (
    <div className={className} style={style}>
      <i>{abbr}</i>
      <span>{symbol}</span>
      <i>{abbr}</i>
    </div>
  )
}