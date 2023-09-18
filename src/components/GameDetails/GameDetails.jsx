import React, { useEffect } from "react";
import lottie from "lottie-web";

import "./GameDetails.css";

import Button from "../Button/Button.jsx";

const GameDetails = ({
  closeModal,
  movesTaken,
  hintsTaken,
  startTime,
  isPlayerWon,
  pressedSolve,
  gameMode,
  mediumMaxEmptyCells,
  hardMaxEmptyCells,
  PlayerName,
  PlayerImage,
  PlayerEmail,
  starttime,
  isloggedin
}) => {

  let gameModeName = "Easy";
  if(gameMode === mediumMaxEmptyCells) gameModeName = "Medium";
  else if(gameMode === hardMaxEmptyCells) gameModeName = "Hard";

  useEffect(async () => {
    let animationData;
    
    if (isPlayerWon&& pressedSolve) {
      animationData = await import("../../assets/animations/LoserAnimation/LoserAnimation.json")
    }
    else if (isPlayerWon) {
        animationData = await import("../../assets/animations/GameWonAnimation/GameWonAnimation.json")
      }
    else {
      animationData = await import("../../assets/animations/KeepTryingAnimation/KeepTryingAnimation.json")
    }

    let container = document.getElementById("lottieAnimation");
    const lottieAnimation = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData.default,
    });

    return () => lottieAnimation.destroy(); // Clean up function
  }, [isPlayerWon, hintsTaken, pressedSolve]);


  const handleclick = async ()=>{
    if(isPlayerWon && !pressedSolve && isloggedin){
      const now = new Date();
      const timeNow = now.getTime();
      const time_taken = timeNow - starttime
      await fetch(import.meta.env.VITE_BACKEND+"/api/won", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        PlayerName,
        PlayerImage,
        PlayerEmail,
        movesTaken,
        gameModeName,
        time_taken
      }),
    })
    }
    closeModal();
  }

  return (
    <div className="GameDetails">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Game Details</h1>
        </div>
        <div className="modal-body">
          <div className="animation-container" id="lottieAnimation"></div>
          {isPlayerWon && <p>You Won !</p>}
          {isPlayerWon && pressedSolve && <p>But at what cost!</p>}
          {!isPlayerWon && <p>Keep Playing you will surely complete it!</p>}
          <p>Game mode: {gameModeName}</p>
          <p>Moves Played: {movesTaken}</p>
          <p>Hints Taken: {hintsTaken}</p>
          <small>Started at: {startTime.toLocaleString().split("GMT")[0]}</small>
        </div>
        <div className="modal-footer">
          <Button
            onClick={handleclick}
            buttonStyle="btn--primary--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
