import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <button onClick={() => { navigate("/getTime") }}>Get Time</button>
      <button onClick={() => { navigate("/revoke") }}>Revoke</button>
      <button onClick={() => { navigate("/generateLink") }}>Generate Link</button>
    </div>
  )
}
