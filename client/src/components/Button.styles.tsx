import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--red);
    color: white;
    border: none;
    border-radius: 10px;
    width: 250px;
    height: 60px;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.05);  // 10% bigger
    }
`

export const IconContainer = styled.img`
    width: 30px;
`

export const IconButton = styled(Button)`
    gap: 5px;
`