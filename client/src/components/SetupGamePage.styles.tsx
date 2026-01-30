import styled from "styled-components";

export const TwoColContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
export const LeftColContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 37px;
`

export const InstructionBox = styled.div`
    background: var(--white);
    width: 370px;
    height: 585px;
    border-radius: 10px;
    padding: 30px;
`

export const InstructionsHeader = styled.h2`
    margin: 0;
    color: var(--red);
`