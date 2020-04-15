import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import SessionContext from './SessionContext'
import './User.css'

export default function User() {
  let history = useHistory()
  const [session, setSession] = useContext(SessionContext)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session))
      setSubmitted(false)

    } else {
      localStorage.removeItem('session')
    }
  }, [session])

  const login = async (email, password) => {
    try {
      let body = JSON.stringify({ email, password })
      const res = await fetch('http://localhost:8080/login', { method: 'post', headers: { 'Content-Type': 'application/json' }, body })
      let session = await res.json().then(({ token }) => {
        return Object.assign({ token }, jwt.decode(token))
      })
      setSession(session)
    } catch(e) {
      console.log('Something went wrong while attempting to login', e)
      setSubmitted(false)
    }
  }

  const logout = () => {
    setSession(null)
    history.push('/')
  }

  useEffect(() => {
    if (submitted) {
      login(email, password)
    }
  }, [submitted])

  if (session) {
    return (
      <div className="user">
        <p>Logged in as {session.displayName}</p>
        <p><button type="button" onClick={() => logout()}>Logout</button></p>
      </div>
    )
  }

  return (
    <div className="user">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
        <fieldset disabled={submitted}>
          <p>First things first: please login!</p>
          <p>
            <label for="email">Email: </label>
            <input name="email" type="text" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </p>
          <p>
            <label for="password">Password: </label>
            <input name="password" type="password" placeholder="SecurePhrase" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </p>
          <p><button type="submit">Login</button></p>
        </fieldset>
      </form>
    </div>
  )
}