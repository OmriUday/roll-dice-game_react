import React, { Component } from "react";
import Dash from "./components/Dash/Dash";
import Panel from "./components/Panel/Panel";
import classes from "./App.module.css";

class App extends Component {
  constructor (props) {
    super(props);
    // State for the app
    this.state = {
      gameActive: true,
      activePlayer: 1,
      scoreToWin: 100,
      dice: [0, 0],
      players: {
        1: {
          current: 0,
          total: 0,
          winner: false
        },
        2: {
          current: 0,
          total: 0,
          winner: false
        }
      }
    };

    this.scoreToWinInputHandler = this.scoreToWinInputHandler.bind(this);
  }

  clonePlayer = state => {
    return {
      1: { ...state.players[1] },
      2: { ...state.players[2] }
    };
  };

  scoreToWinInputHandler(event) {
    this.setState({ scoreToWin: event.target.value });
  }

  // Next player turn
  nextPlayer = () => {
    this.setState(prevState => {
      const players = this.clonePlayer(prevState);
      players[prevState.activePlayer].current = 0;
      return {
        activePlayer: prevState.activePlayer === 1 ? 2 : 1,
        dice: [0, 0],
        players
      };
    });
  };

  // Reset state
  newGameHandler = () => {
    this.setState({
      gameActive: true,
      activePlayer: 1,
      dice: [0, 0],
      players: {
        1: {
          current: 0,
          total: 0,
          winner: false
        },
        2: {
          current: 0,
          total: 0,
          winner: false
        }
      }
    });
  };

  //On dice roll
  rollHandler = () => {
    // No action is performed if game is not active
    if (!this.state.gameActive) return;

    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;

    if (dice1Value === 6 && dice2Value === 6) {
      // Next player's turn, componentDidUpdate will check dice value
      // And call nextPlayer
      this.setState({ dice: [dice1Value, dice2Value] });
      this.setState(prevState => {
        const players = this.clonePlayer(prevState);
        players[prevState.activePlayer].current =
          0;
        players[prevState.activePlayer].total =
          0;

        return {
          dice: [dice1Value, dice2Value],
          players
        };
      });
    } else {
      //Update the current score
      this.setState(prevState => {
        const prevScore = prevState.players[prevState.activePlayer].current;
        const players = this.clonePlayer(prevState);
        players[prevState.activePlayer].current =
          prevScore + dice1Value + dice2Value;

        return {
          dice: [dice1Value, dice2Value],
          players
        };
      });
    }
  };

  // Handle the hold button action
  holdHandler = () => {
    // No action is performed if game is not active
    if (!this.state.gameActive) return;

    // Add CURRENT score to the TOTAL score
    this.setState(prevState => {
      const prevTotal = prevState.players[prevState.activePlayer].total;
      const currentScore = prevState.players[prevState.activePlayer].current;
      const updatedTotal = prevTotal + currentScore;

      const players = this.clonePlayer(prevState);
      players[prevState.activePlayer].current = 0;
      players[prevState.activePlayer].total = updatedTotal;

      return {
        dice: [0, 0],
        players
      };
    });
  };

  // Life cycle method
  componentDidUpdate(prevProps, prevState) {

    if (
      // If the total changed and the active player is the previous player
      this.state.activePlayer === prevState.activePlayer &&
      this.state.players[this.state.activePlayer].total !==
      prevState.players[prevState.activePlayer].total &&
      prevState.gameActive
    ) {
      const currentPlayerTotal = this.state.players[this.state.activePlayer]
        .total;

      // Check if current player won the game
      if (currentPlayerTotal >= this.state.scoreToWin) {
        const players = this.clonePlayer(this.state);
        players[prevState.activePlayer].winner = true;
        this.setState({ gameActive: false, players });
      } else {
        //Next player
        this.nextPlayer();
      }
    }
  }

  // Renders the screen
  render() {
    const panels = Object.keys(this.state.players).map(playerKey => {
      return (
        <Panel
          key={`panel_${playerKey}`}
          number={parseInt(playerKey)}
          activePlayer={this.state.activePlayer}
          current={this.state.players[playerKey].current}
          total={this.state.players[playerKey].total}
          isWinner={this.state.players[playerKey].winner}
        />
      );
    });

    return (
      <div className={classes.App}>
        {panels}
        <Dash
          dice1={this.state.dice[0]}
          dice2={this.state.dice[1]}
          roll={this.rollHandler}
          hold={this.holdHandler}
          new={this.newGameHandler}
          scoreToWin={this.state.scoreToWin}
          handleChange={this.scoreToWinInputHandler}
        />
      </div>
    );
  }
}

export default App;