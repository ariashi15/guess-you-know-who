import { useNavigate } from 'react-router-dom';
import { Button, IconContainer } from '../components/Button.styles'
import { LeftColContainer } from './SetupGamePage.styles';
import { Label, LabelContentContainer } from '../components/Label.styles';
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
                        <IconContainer src='/images/enter.png' />
                    </EnterButton>
                </EnterCodeContainer>
            </LabelContentContainer>
        </LeftColContainer>
    );
}