import React, { useState, useEffect } from 'react'
import { UserProvider } from './UserContext'
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
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const userState = useState(storedUser)

  return (
    <UserProvider value={userState}>
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
                <Link to="/games/new">Create a new game</Link>
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
    </UserProvider>
  )
}

export default App
