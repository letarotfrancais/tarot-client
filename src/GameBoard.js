import React from 'react'
import ActionSwitch from './ActionSwitch'

export default function GameBoard({ gameState }) {
  const [game] = gameState
  const { currentPlayer} = game.tarotGame.state

  return (
    <div>
      <h3>Current player is {currentPlayer.id}</h3>
      <ActionSwitch gameState={gameState} />
    </div>
  )
}