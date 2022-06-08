import { useState } from 'react'

import { Home } from './Home'
import { Register } from './Register'
import { Login } from './Login'

export function App() {
  const [user, setUser] = useState()

  if (user) {
    return <Home />
  }

  return window.location.pathname === '/signup' ? <Register signInUser={setUser} ></Register> : <Login signInUser={setUser} />

}