
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWrapper from './App-wrapper' // Change from App to AppWrapper
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
