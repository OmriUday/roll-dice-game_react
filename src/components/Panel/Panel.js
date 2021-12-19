import React from "react";
import classes from "./Panel.module.css";

const panel = props => {
  const panelClasses = [classes.Panel];
  const playerLabel = props.isWinner ? "Winner" : `Player ${props.number}`;

  if (props.isWinner) {
    panelClasses.push(classes.Winner);
  }
  // If panel number is equal to current active player
  // Number, Set it to active
  else if (props.activePlayer === props.number) {
    console.log("yes");
    panelClasses.push(classes.Active);
  }

  return (
    <div className={panelClasses.join(" ")}>
      <div className={classes.PlayerName}>{playerLabel}</div>
      <div className={classes.PlayerScore}>{props.total}</div>
      <div className={classes.CurrentRollBox}>
        <div className={classes.CurrentRollLabel}>Current</div>
        <div className={classes.CurrentRollTotal}>{props.current}</div>
      </div>
    </div>
  );
};

export default React.memo(panel);