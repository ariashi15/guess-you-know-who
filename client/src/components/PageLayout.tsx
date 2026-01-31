import { Outlet } from "react-router-dom";
import { LogoWrapper, Logo } from "./Logo.styles";
import type { ReactNode } from "react";
import { BoardBackground } from "./PageLayout.styles"

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

export function PageLayout() {
    return (
        <div>
            <LogoWrapper>
                <Logo src="/images/logo.png" alt="Logo" />
            </LogoWrapper>
            <Board>
                <Outlet />
            </Board>
        </div>
    );
}
