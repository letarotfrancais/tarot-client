import React from 'react'
import ActionSwitch from './ActionSwitch'
import Card from './Card'
import './CardList.css'
import './Board.css'

export default function GameBoard({ gameState }) {
  const [game] = gameState
  const { players: users } = game
  const { board, players, currentPlayer } = game.tarotGame.state

  return (
    <div>
      <div className="board card-list">
        {users.map((user, index) => {
          return (
            <div key={index} className={user.uuid === currentPlayer.id ? 'active': ''}>
              <figure><Card card={board[index]} /></figure>
              <legend>{user.displayName}</legend>
            </div>
          )}
        )}
      </div>

      <ActionSwitch gameState={gameState} />
    </div>
  )
}