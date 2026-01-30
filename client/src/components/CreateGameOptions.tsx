import { Button } from './Button.styles'
import { LeftColContainer } from './SetupGamePage.styles';
import { EnterCodeField, EnterCodeHeader, EnterCodeContainer, EnterButton, EnterCodeFieldContainer } from './CreateGameOptions.styles';

export function CreateGameOptions() {
    return (
        <LeftColContainer>
            <Button>Create New Game</Button>
            <EnterCodeContainer>
                <EnterCodeHeader>Join Game</EnterCodeHeader>
                <EnterCodeFieldContainer>
                    <EnterCodeField type='text' placeholder='Game Code'></EnterCodeField>
                    <EnterButton>
                        <img src='enter.png' style={{ 'width': '30px'}}></img>
                    </EnterButton>
                </EnterCodeFieldContainer>
            </EnterCodeContainer>
        </LeftColContainer>
    );
}