import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import InputPlayerName from './components/InputPlayerName'
import GamePlay from './components/GamePlay'
import Rules from './components/Rules'
import GridSizeInput from './components/GridSizeInput'

function App() {
  const [player_names, set_player_names] = useState({ R: '', B: '' });
  const [game_id, set_game_id] = useState(0);
  const [grid_size, set_grid_size] = useState({ rows: 9, cols: 6 });
  
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/grid-size/twoplayer" element = {<GridSizeInput setGridSize={set_grid_size} />} />
        <Route path = "/grid-size/ai" element = {<GridSizeInput setGridSize={set_grid_size} />} />
        <Route path = "/twoplayer" element = {<InputPlayerName set_player_names={set_player_names} />} />
        <Route path = "/game" element = {<GamePlay player_names={player_names} version={"two-player"} grid_size={grid_size} set_game_id = {set_game_id}/>} />
        <Route path = "/game/ai" element = {<GamePlay key = {game_id} player_names={player_names} version={"ai"} grid_size={grid_size} set_game_id={set_game_id} />} />
        <Route path = "/game/rules" element = {<Rules/>} />
      </Routes>
    </Router>
  )
}

export default App
