import React, { useState } from 'react'
import { UserProvider } from './UserContext'
import Home from './Home'
import Games from './Games'
import GameDetail from './GameDetail'
import NewGame from './NewGame'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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

export default App
