import React, { useEffect, useContext, useState } from 'react'
import UserContext from './UserContext'

export default function User() {
  const [user, setUser] = useContext(UserContext)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const login = async (email, password) => {
    try {
      let body = JSON.stringify({ email, password })
      const res = await fetch('http://localhost:8080/login', { method: 'post', headers: { 'Content-Type': 'application/json' }, body })
      setUser(await res.json())
    } catch(e) {
      console.log('Something went wrong while attempting to login', e)
      setSubmitted(false)
    }
  }

  useEffect(() => {
    if (submitted) {
      login(email, password)
    }
  }, [submitted])

  if (user) {
    return (
      <div>
        <span>{user.displayName}</span>
        <button type="button">Logout</button>
      </div>
    )
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
      <input type="text" placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)}/>
      <input type="password" placeholder="SecurePhrase" onChange={(event) => setPassword(event.target.value)}/>
      <button type="submit">Login</button>
    </form>
  )
}