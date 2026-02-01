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
    justify-content: center;
    margin-left: 37px;
    gap: 50px;
`

export const InstructionBox = styled.div`
    background: white;
    width: 370px;
    height: 585px;
    border-radius: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 40px;
`

export const InstructionsHeader = styled.h2`
    margin: 0;
    color: var(--red);
    font-size: 20px;
`