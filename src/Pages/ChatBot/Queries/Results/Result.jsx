import React from 'react'
import Gemini from './Ai/Gemini'
import WebResponses from './Web/WebResponses'
import './Result.css'

function Result() {
  return (
    <div className='search-result-container'>
        <Gemini />
        <WebResponses />
    </div>
  )
}

export default Result