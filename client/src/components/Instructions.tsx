import { InstructionBox, InstructionsHeader } from "./Instructions.styles";

export function Instructions() {
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