import React from 'react'
import './AllStyles/Weather.css'

const Weather = (props) => {
  return (
    <div className='container'>
      <div className='content'>
      <p className='gradient-text'>{props.weather}</p>
      </div>
    </div>
  )
}

export default Weather