import React from 'react'
import ActionSwitch from './ActionSwitch'

export default function GameBoard({ game }) {
  const { tarotGame } = game
  const [action] = tarotGame.actionsSequence

  return (
    <div>
      <ActionSwitch action={action} tarotGame={tarotGame} />
    </div>
  )
}