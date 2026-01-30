import styled from 'styled-components';
import { Button } from './Button.styles';

export const EnterCodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

export const EnterButton = styled(Button)`
    width: 60px;
    height: 60px;
`

export const EnterCodeField = styled.input`
    background: white;
    color: var(--blue);
    width: 180px;
    height: 60px;
    border-radius: 10px;
    padding: 10px;
    border: none;
    font-size: 20px;
    text-align: center;
    &::placeholder {
        font-style: italic;
        color: #b6b6b6;
    }
`