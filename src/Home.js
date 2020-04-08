import React, { useEffect, useContext } from 'react'
import UserContext from './UserContext'

export default function Home() {
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div>
      <h2>French Tarot</h2>
      <p>Here you can play French Tarot.</p>
      <p>Either join an existing game or create a new one.</p>
      <p>But first please pick a nickname!</p>
      <input type="text" value={user} onChange={event => setUser(event.target.value)} />
    </div>
  )
}