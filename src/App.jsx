import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import InputPlayerName from './components/InputPlayerName'
import GamePlay from './components/GamePlay'
import Rules from './components/Rules'

function App() {
  const [player_names, set_player_names] = useState({ R: '', B: '' });
  const [game_id, set_game_id] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/twoplayer" element = {<InputPlayerName set_player_names={set_player_names} />} />
        <Route path = "/game" element = {<GamePlay player_names={player_names} version={"two-player"} set_game_id = {set_game_id}/>} />
        <Route path = "/game/ai" element = {<GamePlay key = {game_id} player_names={player_names} version={"ai"} set_game_id={set_game_id} />} />
        <Route path = "/game/rules" element = {<Rules/>} />
      </Routes>
    </Router>
  )
}

export default App
