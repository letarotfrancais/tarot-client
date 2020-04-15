import React from 'react'
import ActionSwitch from './ActionSwitch'
import Card from './Card'
import './CardList.css'
import './Board.css'

export default function GameBoard({ gameState }) {
  const [game] = gameState
  const { board, players } = game.tarotGame.state
  const displayName = player => player.id.split('-')[0]

  return (
    <div>
      <div className="board card-list">
        {players.map((player, index) => <div key={player.id}><figure><Card card={board[index]} /></figure><legend>{displayName(player)}</legend></div>)}
      </div>

      <ActionSwitch gameState={gameState} />
    </div>
  )
}