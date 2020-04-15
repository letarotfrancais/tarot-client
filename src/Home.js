import React from 'react'
import User from './User'
import './Home.css'

export default function Home() {
  return (
    <div className="board">
      <h2>French Tarot</h2>
      <User />
    </div>
  )
}