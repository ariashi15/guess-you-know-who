import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, IconContainer } from '../components/Button.styles'
import { LeftColContainer, TwoColContainer } from '../components/PageLayout.styles';
import { Label, LabelContentContainer } from '../components/Label.styles';
import { EnterCodeField, EnterButton, EnterCodeContainer } from './Home.styles';
import { GameInstructions } from '../components/GameInstructions';

// randomly generate a 6 character alphanumeric game code
async function generateGameCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let code = '';

    // attempt to generate a code
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // regenerate until we find a code that doesn't already exist
    while (await checkGameExistence(code)) {
        code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }

    return code;
}

// checks if game already exists
async function checkGameExistence(gameCode: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/game/${gameCode}/exists`, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error("Failing checking game existence");
    }

    const data = await res.json();
    console.log(data);

    return data.exists;
}

export function Home() {
    const navigate = useNavigate();
    const [enteredCode, setEnteredCode] = useState('');

    // generate new game when create game button is clicked
    const handleCreateGame = async () => {
        const gameCode = await generateGameCode();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/game/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ gameCode })
        });

        if (!res.ok) {
            throw new Error("Failed to create game")
        }

        navigate(`/waiting-room/${gameCode}`);
    };

    // join existing game with entered code
    const handleJoinGame = async () => {
        const gameCode = enteredCode.trim().toUpperCase();

        if (!gameCode) {
            alert("Please enter a game code.");
            return;
        }

        try {
            const exists = await checkGameExistence(gameCode);

            if (exists) {
                navigate(`/waiting-room/${gameCode}`);
            } else {
                alert("Game not found.");
            }
        } catch (error) {
            console.error("Error checking game:", error);
            alert("Unable to verify game code. Please try again.")
        }
    }

    return (
        <TwoColContainer>
            <GameInstructions />
            <LeftColContainer>
                <Button onClick={handleCreateGame}>Create New Game</Button>
                <LabelContentContainer>
                    <Label>Join Game</Label>
                    <EnterCodeContainer>
                        <EnterCodeField 
                            type='text'
                            placeholder='Game Code'
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value)}
                            onKeyDown={(e)=> e.key === "Enter" && handleJoinGame()}
                        ></EnterCodeField>
                        <EnterButton onClick={handleJoinGame}>
                            <IconContainer src='/images/enter.png' />
                        </EnterButton>
                    </EnterCodeContainer>
                </LabelContentContainer>
            </LeftColContainer>
        </TwoColContainer>

    );
}