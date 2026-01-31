import { useRef } from 'react';
import { LeftColContainer } from "./SetupGamePage.styles";
import { Label, LabelContentContainer } from "../components/Label.styles";
import { GameCode, PlayerContainer, PlayerLabel, PlayersContainer, PlayerStatus } from "./WaitingRoom.styles";
import { IconButton, IconContainer } from "../components/Button.styles";

function Players() {
    return (
        <PlayersContainer>
            <PlayerContainer style={{ 'color': 'var(--red)'}}>
                <img src='/images/user-red.png'/>
                <PlayerLabel>You</PlayerLabel>
                <PlayerStatus>Connected</PlayerStatus>
                <PlayerStatus>Friends Uploaded</PlayerStatus>
            </PlayerContainer>
            <PlayerContainer style={{ 'color': 'var(--yellow)'}}>
                <img src='/images/user-yellow.png'/>
                <PlayerLabel>Opponent</PlayerLabel>
                <PlayerStatus>Connected</PlayerStatus>
                <PlayerStatus>Friends Not Uploaded</PlayerStatus>
            </PlayerContainer>
        </PlayersContainer>
    );
}

async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3001/upload", {
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

export function WaitingRoom() {
    // reference to hidden file input element
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;
        
        try {
            await uploadFile(file);
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
        <LeftColContainer>
            <LabelContentContainer>
                <Label>Game Code</Label>
                <GameCode>ABCDEF</GameCode>
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
            <Players></Players>
        </LeftColContainer>
    );
}