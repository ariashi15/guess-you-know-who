import { CardsContainer, CardContainer, Photo, NameContainer, Username, FlippedCardContainer } from "./GamePage.styles";
import { useState } from "react";

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

function GenerateBoard() {
    const cards: Card[] = Array.from({ length: 24 }, (_, index) => (
        {
            name: `User ${index + 1}`,
            username: `@user${index + 1}`,
            pfp: '/images/default-pfp.jpeg',
            flipped: false
        }
    ));

    return cards;
}

export function GamePage() {
    const cards = GenerateBoard();

    return (
        <CardsContainer>
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </CardsContainer>
    );
}