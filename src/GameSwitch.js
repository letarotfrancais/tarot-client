import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from './UserContext'
import GameDetail from './GameDetail'
import GameBoard from './GameBoard'


export default function GameSwitch() {
  const { gameId } = useParams()
  const [user] = useContext(UserContext)
  const gameState = useState({})
  const [game, setGame] = gameState

  const fetchGame = async () => {
    try {
      const res = await fetch(`http://localhost:8080/games/${gameId}`, { headers: { user } })
      setGame(await res.json())
    } catch(e) {
      console.log('Something went wrong while attempting to get a game`s details', e)
    }
  }

  useEffect(() => {
    fetchGame()
    const intervalId = setInterval(() => fetchGame(), 3000)
    return () => clearTimeout(intervalId)
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