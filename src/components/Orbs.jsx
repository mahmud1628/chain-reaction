import "./Orbs.css";
import { getOrbOrientation } from "./GameLogics";

const Orbs = (props) => {
  const { count, color, row, col , ROWS, COLS} = props;
  if(typeof count !== "number" || !color) return null; // invalid props
  if (count == 0) return null; // no orbs to display

  const orbPositions = getOrbOrientation(count, row, col, ROWS, COLS);

  const safeCount = Math.min(count, 4); // protect against invalid count

  return (
    <>
      {orbPositions[safeCount].map((position, index) => (
        <div
          key={index}
          className={`orb ${color}`}
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      ))}
    </>
  );
};

export default Orbs;