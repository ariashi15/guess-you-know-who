import { TwoColContainer, InstructionBox, InstructionsHeader } from "./SetupGamePage.styles";
import { CreateGameOptions } from "./CreateGameOptions";

function Instructions() {
    const steps = [
        'Step 1', 
        'Step 2', 
        'Step 3'
    ];
    
    return (
        <InstructionBox>
            <InstructionsHeader>How to Play</InstructionsHeader>
            <ol style={{lineHeight: 1.6}}>
                {steps.map((step, index) => (
                    <li key={index} style={{color: 'var(--red)'}}>{step}</li>
                ))}
            </ol>
        </InstructionBox>
    );
}

export function SetupGamePage() {
    return (
        <TwoColContainer>
            <Instructions />
            <CreateGameOptions />
        </TwoColContainer>
    );
}