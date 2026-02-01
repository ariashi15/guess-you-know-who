import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeftColContainer, TwoColContainer } from "../components/PageLayout.styles";
import { Label, LabelContentContainer } from "../components/Label.styles";
import { GameCode, PlayerContainer, PlayerLabel, PlayersContainer, PlayerStatus } from "./WaitingRoom.styles";
import { IconButton, IconContainer } from "../components/Button.styles";
import { UploadInstructions } from '../components/UploadInstructions';

interface GameStatus {
  player1Connected: boolean;
  player2Connected: boolean;
  player1Uploaded: boolean;
  player2Uploaded: boolean;
}

// localStorage key for storing the unique client identifier
// persists across page refreshes so the player always has the same ID
const CLIENT_ID_KEY = "gykw_client_id";

// retrieves a stable, unique identifier for this device/browser
function getClientId(): string {
  // check if we already have a client ID stored
  const existing = localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  // generate a new client ID
  // fall back to timestamp + random string if crypto.randomUUID() not available
  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `client-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // save it to localStorage so it persists
  localStorage.setItem(CLIENT_ID_KEY, generated);
  return generated;
}

export function WaitingRoom() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);  // reference to hidden file input element
    const { gameCode } = useParams<{ gameCode: string }>();
    // State to track game status
    const [playerId, setPlayerId] = useState('');
    const [gameStatus, setGameStatus] = useState<GameStatus>({
        player1Connected: false,
        player2Connected: false,
        player1Uploaded: false,
        player2Uploaded: false,
    });

    // join the game and get assigned to player1 or player2
    useEffect(() => {
        if (!gameCode) return;

        const playerSlotKey = `gykw_player_slot_${gameCode}`;
        const storedSlot = localStorage.getItem(playerSlotKey);
        if (storedSlot === "player1" || storedSlot === "player2") {
            setPlayerId(storedSlot);
        }

        const joinGame = async () => {
            try {
                // Send the client's stable ID to the backend
                // The backend will recognize if this client already joined and return the same slot
                const res = await fetch(`${import.meta.env.VITE_API_URL}/game/${gameCode}/join`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ playerId: getClientId() }),
                });

                if (!res.ok) {
                    throw new Error("Failed to join game");
                }

                const data = await res.json();
                // store the assigned player slot ("player1" or "player2")
                // this is used to label "you" vs "opponent" in the UI
                setPlayerId(data.assignedPlayerId);
                localStorage.setItem(playerSlotKey, data.assignedPlayerId);

            } catch (error) {
                console.error("Error joining game:", error);
            }
        };

        joinGame();
    }, [gameCode]);


    // continuously poll game status to check readiness
    useEffect(() => {
        if (!gameCode) return;

        const interval = setInterval(async () => {
            try {
                const status = await checkGameStatus(gameCode);
                setGameStatus(status);
                
                // navigate to game page if both players have joined and uploaded
                if (status.player1Connected && status.player2Connected && status.player1Uploaded && status.player2Uploaded) {
                    navigate(`/play/${gameCode}`);
                }
            } catch (error) {
                console.error("Error checking game status:", error);
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !gameCode || !playerId) return;
        
        try {
            await uploadFile(file, gameCode, playerId);
        } catch (error) {
            console.error("Upload failed: ", error);
            return;
        }

        console.log("Upload successful");
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <TwoColContainer>
            <UploadInstructions />
            <LeftColContainer>
                <LabelContentContainer>
                    <Label>Game Code</Label>
                    <GameCode>{gameCode}</GameCode>
                </LabelContentContainer>

                {/* hidden file input trigger */}
                <input 
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleUpload}
                    style={{ display: 'none'}}
                />

                <IconButton onClick={triggerFileInput}>
                    <IconContainer src="/images/upload.png"></IconContainer>
                    Upload Friends
                </IconButton>
                <Players currentPlayerId={playerId} gameStatus={gameStatus} />
            </LeftColContainer>
        </TwoColContainer>
    );
}

// checks if game is full and files are uploaded
async function checkGameStatus(gameCode: string): Promise<GameStatus> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/game/${gameCode}/status`);
  
  if (!res.ok) {
    throw new Error("Failed to check game status");
  }

  return res.json();
}

// handles file upload
async function uploadFile(file: File, gameCode: string, playerId: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("gameCode", gameCode);
    formData.append("playerId", playerId);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
        throw new Error("Upload failed");
    }

    const data = await res.json();
    console.log(data);
    return data;
}

function Players({ currentPlayerId, gameStatus }: { currentPlayerId: string; gameStatus: GameStatus }) {
    // set color based on if this player is player 1 or 2
    const isPlayer1 = currentPlayerId === "player1";
    const youColor = isPlayer1 ? "var(--red)" : "var(--yellow)";
    const opponentColor = isPlayer1 ? "var(--yellow)" : "var(--red)";
    const youIcon = isPlayer1 ? "/images/user-red.png" : "/images/user-yellow.png";
    const opponentIcon = isPlayer1 ? "/images/user-yellow.png" : "/images/user-red.png";

    // get upload + connection status based on which player this client is
    const youUploaded = isPlayer1 ? gameStatus.player1Uploaded : gameStatus.player2Uploaded;
    const opponentConnected = isPlayer1 ? gameStatus.player2Connected : gameStatus.player1Connected;
    const opponentUploaded = isPlayer1 ? gameStatus.player2Uploaded : gameStatus.player1Uploaded;

    return (
        <PlayersContainer>
            <PlayerContainer style={{ 'color': youColor }}>
                <img src={youIcon}/>
                <PlayerLabel>You</PlayerLabel>
                <PlayerStatus>Connected</PlayerStatus>
                <PlayerStatus>{youUploaded ? "Friends Uploaded" : "Friends Not Uploaded"}</PlayerStatus>
            </PlayerContainer>
            <PlayerContainer style={{ 'color': opponentColor }}>
                <img src={opponentIcon}/>
                <PlayerLabel>Opponent</PlayerLabel>
                <PlayerStatus>{opponentConnected ? "Connected" : "Waiting..."}</PlayerStatus>
                <PlayerStatus>{opponentUploaded ? "Friends Uploaded" : "Friends Not Uploaded"}</PlayerStatus>
            </PlayerContainer>
        </PlayersContainer>
    );
}