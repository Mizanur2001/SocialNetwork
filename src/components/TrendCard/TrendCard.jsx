import React from 'react'
import './TrendCard.css'
import { TrendData } from '../../Data/TrendData'

const TrendCard = () => {
  return (
    <div className='TrendCard'>
      <h3>Trends for you</h3>
      {TrendData.map((data, id) => {
        return (
          <div className='Trend'>
            <span>#{data.name}</span>
            <span>{data.shares}k shares</span>
          </div>
        )
      })}
      <div></div>
    </div>
  )
}

export default TrendCard
