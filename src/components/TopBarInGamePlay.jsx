import PlayerTurn from "./PlayerTurn";
import "./TopBarInGamePlay.css"; // Importing styles for the top bar in game play
import { Link } from "react-router-dom"; // Importing Link for navigation between routes


const TopBarInGamePlay = ({ current_player, player_names , version }) => {
    return (
        <>
    <Link to="/" className="back-btn">
        ⬅️ Exit
      </Link>
            <PlayerTurn current_player={current_player} player_names={player_names} version={version}/>
      </>
    )
}

export default TopBarInGamePlay;

