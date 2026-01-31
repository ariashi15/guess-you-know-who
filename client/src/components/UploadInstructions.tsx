import { InstructionBox, InstructionsHeader } from "./SetupGamePage.styles";

export function UploadInstructions() {
    const steps = [ 
        'Create a game or join a game via code.',
        `Go to Instagram Web > Settings > See more in Accounts Center > Your information and permissions > 
        Export your information > Create export > Export to device.`,
        'Inside Customize Information, deselect all information except for followers and following.',
        'Inside Format, select JSON',
        'Your information may take a few minutes to export. Download to your computer when ready.',
        'Unzip the file. Upload following.json to Guess You-Know-Who.'
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