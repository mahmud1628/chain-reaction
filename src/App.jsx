import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import InputPlayerName from './components/InputPlayerName'
import GamePlay from './components/GamePlay'

function App() {
  const [player_names, set_player_names] = useState({ R: '', B: '' });
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/twoplayer" element = {<InputPlayerName set_player_names={set_player_names} />} />
        <Route path = "/game" element = {<GamePlay player_names={player_names} />} />
      </Routes>
    </Router>
  )
}

export default App
