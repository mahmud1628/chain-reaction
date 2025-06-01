import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import InputPlayerName from './components/InputPlayerName'

function App() {
  const [player_names, set_player_names] = useState({ R: '', B: '' });
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/twoplayer" element = {<InputPlayerName set_player_names={set_player_names} />} />
        <Route path = "/game" element = {<GameBoard player_names={player_names} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
