import React from "react";
import classes from "./Dash.module.css";
import ControlButton from "../ControlButton/ControlButton";
import Dice from "../Dice/Dice";

const dash = props => {
  return (
    <div className={classes.Dash}>
      <ControlButton
        icon="ion-ios-plus-outline"
        text="New Game"
        click={props.new}
      />
      <Dice value={props.dice1} />
      <Dice value={props.dice2} />

      <ControlButton icon="ion-ios-loop" text="Roll Dice" click={props.roll} />
      <ControlButton
        icon="ion-ios-download-outline"
        text="Hold"
        click={props.hold}
      />
      <div className={classes.ScoreToWin}>
        <label className={classes.ScoreToWinLabel} htmlFor="scoreToWin">
          Score to win!
        </label>
        <input
          id="scoreToWin"
          type="number"
          value={props.scoreToWin}
          className={classes.ScoreToWin}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
};

export default React.memo(dash);