import React from 'react'
import './Card.css'

export default function Card({ card }) {
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

  return (
    <div className={className} style={{ '--height': '12rem', color }}>
      <i>{abbr}</i>
      <span>{symbol}</span>
      <i>{abbr}</i>
    </div>
  )
}