import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameSelect.scss";
import mode1Img from "../../../assets/img/select_game_random.png";
import mode2Img from "../../../assets/img/select_game_friend.png";
import mode3Img from "../../../assets/img/select_game_computer.png";
import song from "../../../assets/audio/gameselect.mp3";
import useSound from "use-sound";
import { connectWallet } from "../../../utils/metamask"; // Adjust path as needed

export const GameSelect = () => {
  const [playSong] = useSound(song);
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  const matchPlayAction = () => {
    navigate("/matchPlay");
    playSong();
  };

  const friendPlayAction = () => {
    navigate("/friendPlay");
    playSong();
  };

  const machinePlayAction = () => {
    navigate("/machinePlay");
    playSong();
  };

  const handleConnectWallet = async () => {
    const walletData = await connectWallet();
    if (walletData) {
      setWalletAddress(walletData.address);
    }
  };

  return (
    <div className="GameSelect">
      <div>
        <button
          className="u-item"
          onClick={handleConnectWallet}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <div className="u-item-text">
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}
          </div>
        </button>
        {walletAddress && (
          <div style={{ marginBottom: "20px", color: "#007bff" }}>
            Wallet: {walletAddress}
          </div>
        )}
      </div>
      <div className="u-container">
        <div className="u-ribbon">Select game</div>
        <div className="u-content">
          <div className="u-item" onClick={matchPlayAction}>
            <Image className="u-item-image" src={mode1Img}></Image>
            <div className="u-item-text">Match with Random User</div>
          </div>
          <div className="u-item" onClick={friendPlayAction}>
            <Image className="u-item-image" src={mode2Img}></Image>
            <div className="u-item-text">Match with Friend</div>
          </div>
          <div className="u-item" onClick={machinePlayAction}>
            <Image className="u-item-image" src={mode3Img}></Image>
            <div className="u-item-text">Match with Computer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelect;
