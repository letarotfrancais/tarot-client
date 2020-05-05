import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GameDetail from './GameDetail'
import GameBoard from './GameBoard'
import { fetchAPI } from './APIService'

export default function GameSwitch() {
  const { gameId } = useParams()
  const gameState = useState({})
  const [game, setGame] = gameState

  const fetchGame = async () => {
    try {
      setGame(await fetchAPI(`games/${gameId}`))
    } catch(e) {
      console.log('Something went wrong while attempting to get a game`s details', e)
    }
  }

  useEffect(() => {
    fetchGame()
    const intervalId = setInterval(() => fetchGame(), 3000)
    return () => clearTimeout(intervalId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!game.id) {
    return (
      <div>
        <h2>Game switch</h2>
        <p>Loading...</p>
      </div>
    )
  }

  switch (game.status) {
    case 'created':
      return <GameDetail gameState={gameState}/>
    case 'started':
      return <GameBoard gameState={gameState}/>
    default:
      return <GameDetail gameState={gameState} />
  }
}