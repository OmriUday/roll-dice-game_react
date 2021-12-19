import React from "react";
import classes from "./Dice.module.css";
import Dice1 from "../../assets/img/dice-1.png";
import Dice2 from "../../assets/img/dice-2.png";
import Dice3 from "../../assets/img/dice-3.png";
import Dice4 from "../../assets/img/dice-4.png";
import Dice5 from "../../assets/img/dice-5.png";
import Dice6 from "../../assets/img/dice-6.png";

// Dice Images
const dice = props => {
  const diceArray = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  let diceClasses = [classes.Dice, classes.Hidden];
  if (props.value > 0) {
    diceClasses = [classes.Dice];
  }
  return (
    <img
      src={diceArray[props.value - 1]}
      alt="Dice"
      className={diceClasses.join(" ")}
    />
  );
};

export default React.memo(dice);