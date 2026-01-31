import styled from 'styled-components';
import { Label } from '../components/Label.styles';

export const GameCode = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: var(--blue);
    width: 250px;
    height: 80px;
    background: white;
    border-radius: 10px;
`

export const PlayersContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

export const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const PlayerLabel = styled(Label)`
    color: inherit;
`

export const PlayerStatus = styled.div`
    color: white;
    font-style: italic;
    font-size: 10px;
`

export const UploadButton = styled.input`
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
    gap: 5px;
`