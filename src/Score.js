import React from 'react'

export default function Score({ score }) {
  
  return (
    <div className="score">
      <div className="red-score">
        <div className="score-icon red" />
        {score.red}
      </div>
      <div className="blue-score">
        <div className="score-icon blue" />
        {score.blue}
      </div>
    </div>
  )
}