import React, { useState } from 'react'
import { SessionProvider } from './SessionContext'
import Home from './Home'
import Games from './Games'
import GameSwitch from './GameSwitch'
import NewGame from './NewGame'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import './App.css'

function App() {
  const storedSession = JSON.parse(localStorage.getItem('session'))
  const sessionState = useState(storedSession)

  return (
    <SessionProvider value={sessionState}>
      <div className="App">
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
                <Link to="/games/new">New game</Link>
              </li>
              <li>
              </li>
            </ul>
          </nav>
          <main>
            <Switch>
              <Route path="/games/new">
                <NewGame />
              </Route>
              <Route path="/games/:gameId">
                <GameSwitch />
              </Route>
              <Route path="/games">
                <Games />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </SessionProvider>
  )
}

export default App
