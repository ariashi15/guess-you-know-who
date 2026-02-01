import styled from "styled-components"

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 15px;
    width: 100%;
    height: 100%;
`

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px;
    background: var(--yellow);
    width: 100px;
    height: 135px;
    border-radius: 5px;
`

export const FlippedCardContainer = styled(CardContainer)`
    color: white;
    font-size: 80px;
`

export const Photo = styled.img`
    border-radius: 3px;
    height: 90px;
    width: 90px;
`

export const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background: white;
    height: 30px;
    width: 90px;
    font-size: 10px;
`
export const Username = styled.div`
    font-family: var(--font-body-bold);
    font-weight: bold;
`