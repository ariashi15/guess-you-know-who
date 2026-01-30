import { useNavigate } from 'react-router-dom';
import { Button, IconContainer } from './Button.styles'
import { LeftColContainer } from './SetupGamePage.styles';
import { Label, LabelContentContainer } from './Label.styles';
import { EnterCodeField, EnterButton, EnterCodeContainer } from './CreateGameOptions.styles';

export function CreateGameOptions() {
    const navigate = useNavigate();

    return (
        <LeftColContainer>
            <Button onClick={() => navigate('/waiting-room')}>Create New Game</Button>
            <LabelContentContainer>
                <Label>Join Game</Label>
                <EnterCodeContainer>
                    <EnterCodeField type='text' placeholder='Game Code'></EnterCodeField>
                    <EnterButton onClick={() => navigate('/waiting-room')}>
                        <IconContainer src='enter.png' />
                    </EnterButton>
                </EnterCodeContainer>
            </LabelContentContainer>
        </LeftColContainer>
    );
}