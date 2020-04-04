import React, { useState, useContext, useEffect } from 'react'
import { useFetch } from './utils'
import UserContext, { UserProvider } from './UserContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from 'react-router-dom'

function App() {
  const userState = useState('anonymous')
  const [user, setUser] = userState
  return (
    <UserProvider value={userState}>
      <div className="App">
        <h4>
          Logged in as <input type="text" value={user} onChange={event => setUser(event.target.value)} />
        </h4>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/games">Games</Link>
              </li>
              <li>
                <Link to="/games/new">Create a new game</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/games/new">
              <NewGame />
            </Route>
            <Route path="/games/:gameId">
              <GameDetail />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  )
}

function Home() {
  return (
    <div>
      <h2>French Tarot</h2>
      <p>Here you can play French Tarot.</p>
      <p>Either join an existing game or create a new one.</p>
    </div>
  )
}

function Games() {
  const res = useFetch('http://localhost:8080/games')

  if (!res.response) {
    return (
      <div>
        <h2>Games</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const games = res.response

  if (games.length === 0) {
    return (
      <div>
        <p>No game created yet.</p>
        <Link to="/games/new">Create a game</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map(({ id }) => (
          <li key={id}>
            <Link to={{ pathname: `/games/${id}` }} >{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function GameDetail() {
  const [user] = useContext(UserContext)
  const { gameId } = useParams()
  const [game, setGame] = useState({})
  const [joined, setJoined] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        let rest = await fetch(`http://localhost:8080/games/${gameId}`, { headers: { user } })
        setGame(await rest.json())
      } catch(e) {
        console.log('Something went wrong while attempting to get a game`s details', e)
      }
    }
    fetchGame()
  }, []);

  useEffect(() => {
    if (joined) {
      const joinGame = async () => {
        try {
          let rest = await fetch(`http://localhost:8080/games/${gameId}/join`, { method: 'post', headers: { user } })
          setGame(await rest.json())
        } catch(e) {
          console.log('Something went wrong while attempting to join a game', e)
        }
      }
      joinGame()
    }
  }, [joined]);

  useEffect(() => {
    if (deleted === 'pending') {
      const joinGame = async () => {
        try {
          fetch(`http://localhost:8080/games/${gameId}`, { method: 'delete', headers: { user } })
          setDeleted('done')
        } catch(e) {
          console.log('Something went wrong while attempting to join a game', e)
        }
      }
      joinGame()
    }
  }, [deleted]);

  if (deleted === 'done') {
    return (
      <Redirect to='/games' />
    )
  }

  if (!game.id) {
    return (
      <div>
      <h2>Games</h2>
      <p>Loading...</p>
    </div>
    )
  }

  const joinAction = !game.players.includes(user) ? <button type="button" onClick={() => setJoined(true)}>Join this game</button> : 'You are a member of this game.'
  const deleteAction = game.owner === user ? <button type="button" onClick={() => setDeleted('pending')}>Delete this game</button> : ''

  return (
    <div>
      <h2>Game detail</h2>
      <p>Owner: {game.owner}</p>
      <p>{deleteAction}</p>
      <p>{joinAction}</p>
      <h3>Players</h3>
      <ul>
        {game.players.map((player, index) => {
          return <li key={index}>{player}</li>
        })}
      </ul>
    </div>
  )
}

function NewGame() {
  const [user] = useContext(UserContext)
  const [clicked, setClicked] = useState(false)
  const [gameId, setGameId] = useState('')
  useEffect(() => {
    if (clicked) {
      const createGame = async () => {
        try {
          let rest = await fetch('http://localhost:8080/games', { method: 'post', headers: { user } })
          let { id } = await rest.json()
          setGameId(id)
        } catch(e) {
          console.log('Something went wrong while attempting to create a new game', e)
        }
      }
      createGame()
    }
  }, [clicked]);

  if (gameId) {
    return (
      <Redirect to={`/games/${gameId}`} />
    )
  }

  return (
    <div>
      <h2>New game</h2>
      <p>You'll create a new game and join it as {user}.</p>
      <button type="button" onClick={() => setClicked(true)}>Create new game</button>
    </div>
  )
}

export default App
