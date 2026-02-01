import { CardsContainer, CardContainer, Photo, NameContainer, Username, FlippedCardContainer } from "./GamePage.styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Card {
    name: string;
    username: string;
    pfp_url: string;
    flipped: boolean;
}

interface Profile {
    username: string;
    fullName: string;
    profilePicUrl: string;
}

function Card({ name, username, pfp_url, flipped: initialFlipped }: Card) {
    const [flipped, setFlipped] = useState(initialFlipped);

    return (
        <div onClick={() => setFlipped(!flipped)}>
            {!flipped ? (
                <CardContainer>
                    <Photo
                        src={pfp_url}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                            e.currentTarget.src = "/images/default-pfp.jpeg";
                        }}
                    ></Photo>
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

function createBoardFromProfiles(profiles: Profile[]) {
    return profiles.map((profile) => {
        const proxyUrl = profile.profilePicUrl 
            ? `${import.meta.env.VITE_API_URL}/proxy-image?url=${encodeURIComponent(profile.profilePicUrl)}`
            : "/images/default-pfp.jpeg";
        
        return {
            name: profile.fullName || profile.username,
            username: `@${profile.username}`,
            pfp_url: proxyUrl,
            flipped: false,
        };
    });
}

export function GamePage() {
    const [board, setBoard] = useState<Profile[]>([]);
    const { gameCode } = useParams<{ gameCode: string }>();

    useEffect(() => {
        if (!gameCode) return;

        const getBoard = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/game/${gameCode}/board`);

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

        let interval: ReturnType<typeof setInterval> | undefined;
        if (board.length === 0) {
            interval = setInterval(getBoard, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };

    }, [gameCode, board.length]);

    const cards = createBoardFromProfiles(board);

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