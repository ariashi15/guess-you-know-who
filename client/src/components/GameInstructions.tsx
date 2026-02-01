import { InstructionBox, InstructionsHeader } from "./PageLayout.styles";

export function GameInstructions() {
    return (
        <InstructionBox>
            <InstructionsHeader>How to Play</InstructionsHeader>
            <ol style={{lineHeight: 1.5, color: 'var(--red)'}}>
                <li><b>Create</b> or <b>join</b> a new game!</li>
                <li>Upload the people you follow on Instagram. The game will generate a board based on <b>you and your opponents' mutuals.</b></li>
                <li>You and your opponent have the same board. <b>Choose someone on your board</b> for your opponent to guess - keep it a secret.</li>
                <li>Take turns asking <b>yes or no questions</b> with your opponent about your chosen people.</li>
                <li>If you're able to eliminate someone based on your opponent's answer to a question, <b>flip that card over</b></li>
                <li>Once you think you know who your opponent's person is, <b>guess!</b></li>
            </ol>
        </InstructionBox>
    );
}