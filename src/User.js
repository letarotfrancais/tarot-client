import React, { useEffect, useContext } from 'react'
import UserContext from './UserContext'

export default function User() {
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return <input type="text" value={user} onChange={event => setUser(event.target.value)} />
}