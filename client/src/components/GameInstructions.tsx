import { InstructionBox, InstructionsHeader } from "./SetupGamePage.styles";

export function GameInstructions() {
    const steps = [ 
        'Create a new game! Guess You-Know-Who is played with two people.',
        'Upload the people you follow on Instagram. The game will generate a board based on you and your opponents\' mutuals.',
        'Start the game! You and your opponent have the same board. Choose someone on your board for your opponent to guess - keep it a secret.',
        'Take turns asking yes or no questions with your opponent about your chosen people.',
        'If you\'re able to eliminate someone based on your opponent\'s answer to a question, flip that card over',
        'Once you think you know who your opponent\'s person is, guess!'
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