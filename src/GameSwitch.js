import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from './UserContext'
import GameDetail from './GameDetail'
import GameBoard from './GameBoard'


export default function GameSwitch() {
  const { gameId } = useParams()
  const [user] = useContext(UserContext)
  const [game, setGame] = useState({})

  useEffect(() => {
    const fetchGame = async () => {
      try {
        let res = await fetch(`http://localhost:8080/games/${gameId}`, { headers: { user } })
        setGame(await res.json())
      } catch(e) {
        console.log('Something went wrong while attempting to get a game`s details', e)
      }
    }
    fetchGame()
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
      return <GameDetail game={game}/>
    case 'started':
      return <GameBoard game={game}/>
    default:
      return <GameDetail game={game} />
  }
}