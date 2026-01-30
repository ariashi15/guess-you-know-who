import { LeftColContainer } from "./SetupGamePage.styles";
import { Label, LabelContentContainer } from "../components/Label.styles";
import { GameCode, PlayerContainer, PlayerLabel, PlayersContainer, PlayerStatus } from "./WaitingRoom.styles";
import { IconButton, IconContainer } from "../components/Button.styles";

function Players() {
    return (
        <PlayersContainer>
            <PlayerContainer style={{ 'color': 'var(--red)'}}>
                <img src='user-red.png'/>
                <PlayerLabel>You</PlayerLabel>
                <PlayerStatus>Connected</PlayerStatus>
                <PlayerStatus>Friends Uploaded</PlayerStatus>
            </PlayerContainer>
            <PlayerContainer style={{ 'color': 'var(--yellow)'}}>
                <img src='user-yellow.png'/>
                <PlayerLabel>Opponent</PlayerLabel>
                <PlayerStatus>Connected</PlayerStatus>
                <PlayerStatus>Friends Not Uploaded</PlayerStatus>
            </PlayerContainer>
        </PlayersContainer>
    );
}

export function WaitingRoom() {
    return (
        <LeftColContainer>
            <LabelContentContainer>
                <Label>Game Code</Label>
                <GameCode>ABCDEF</GameCode>
            </LabelContentContainer>
            <IconButton>
                <IconContainer src="upload.png"></IconContainer>
                Upload Friends
            </IconButton>
            <Players></Players>
        </LeftColContainer>
    );
}