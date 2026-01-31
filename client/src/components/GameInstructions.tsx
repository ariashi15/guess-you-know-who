import { InstructionBox, InstructionsHeader } from "./SetupGamePage.styles";

export function GameInstructions() {
    const steps = [ 
        'Step 1',
        'Step 2'
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