import { CardsContainer, CardContainer, Photo, NameContainer, Username, FlippedCardContainer } from "./GamePage.styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Card {
    name: string;
    username: string;
    pfp: string;
    flipped: boolean;
}

function Card({ name, username, pfp, flipped: initialFlipped }: Card) {
    const [flipped, setFlipped] = useState(initialFlipped);

    return (
        <div onClick={() => setFlipped(!flipped)}>
            {!flipped ? (
                <CardContainer>
                    <Photo src={pfp}></Photo>
                    <NameContainer>
                    <Username>{username}</Username>
                    <div>{name}</div>
                    </NameContainer>
                </CardContainer>
            ) : (
                <FlippedCardContainer>?</FlippedCardContainer>
            )}
        </div>
    );
}

// convert the pre-shuffled board from backend into Card objects
// handles URL parsing to extract usernames
function createBoard(board: string[]) {
    return board.map((profileUrl) => {
        let username = profileUrl;

        // pull the username from the path if this is a URL
        try {
            const url = new URL(profileUrl);
            const lastSegment = url.pathname.split("/").filter(Boolean).pop();
            if (lastSegment) {
                username = lastSegment;
            }
        } catch {
            // if it's not a URL, keep the string as-is (minus a leading @)
            username = profileUrl.replace(/^@/, "");
        }
        
        const handle = username.startsWith("@") ? username : `@${username}`;

        return {
            name: username,
            username: handle,
            pfp: "/images/default-pfp.jpeg",
            flipped: false,
        };
    });
}

export function GamePage() {
    const [board, setBoard] = useState<string[]>([]);
    const { gameCode } = useParams<{ gameCode: string }>();

    useEffect(() => {
        if (!gameCode) return;

        const getBoard = async () => {
            const res = await fetch(`http://localhost:3001/game/${gameCode}/board`);

            if (!res.ok) {
                console.error("Error fetching board");
                return;
            }

            const data = await res.json();
            if (Array.isArray(data.board) && data.board.length > 0) {
                setBoard(data.board);
            }
        };

        getBoard();

    }, [gameCode]);

    const cards = createBoard(board);

    return (
        <CardsContainer>
            {cards.length === 0 ? (
                <div style={{ color: 'white', width: "200px" }}>Generating board...</div>
            ) : (
                cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))
            )}
        </CardsContainer>
    );
}