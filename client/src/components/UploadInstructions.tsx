import { InstructionBox, InstructionsHeader } from "./PageLayout.styles";

export function UploadInstructions() {
    return (
        <InstructionBox>
            <InstructionsHeader>How to Upload Your Friends</InstructionsHeader>
            <ol style={{lineHeight: 1.5, color: 'var(--red)'}}>
                <li>Go to <i>Instagram Web &gt; Settings &gt; See more in Accounts Center &gt; Your information and permissions &gt; 
        Export your information &gt; Create export &gt; Export to device.</i></li>
                <li>Inside <b>Customize Information</b>, deselect all information except for followers and following.</li>
                <li>Inside <b>Format</b>, select JSON</li>
                <li>Your information may take a few minutes to export. Download to your computer when ready.</li>
                <li>Unzip the file on your computer. Upload <b>following.json</b> to Guess You-Know-Who.</li>
            </ol>
        </InstructionBox>
    );
}