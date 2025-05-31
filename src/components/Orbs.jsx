import "./Orbs.css";

const Orbs = (props) => {
  const { count, color } = props;
  if (count == 0) return null; // no orbs to display

  const orbPositions = {
    1: [{ left: "50%", top: "50%" }],
    2: [
      { left: "25%", top: "50%" },
      { left: "75%", top: "50%" },
    ],
    3: [
      { left: "50%", top: "25%" },
      { left: "25%", top: "75%" },
      { left: "75%", top: "75%" },
    ],
  };

  return (
    <>
      {orbPositions[count].map((position, index) => (
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