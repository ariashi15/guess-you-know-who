import type { ReactNode } from "react";
import { BoardBackground } from "./Board.styles";

// allow board to wrap other components
type BoardProps = {
    children?: ReactNode;
};

export function Board({ children }: BoardProps) {
    return (
        <BoardBackground>
            {children}
        </BoardBackground>
    );
}
