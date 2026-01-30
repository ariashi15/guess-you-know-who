import type { ReactNode } from "react";
import * as B from "./Board.styles";

// allow board to wrap other components
type BoardProps = {
    children?: ReactNode;
};

export function Board({ children }: BoardProps) {
    return (
        <B.BoardBackground>
            {children}
        </B.BoardBackground>
    );
}
