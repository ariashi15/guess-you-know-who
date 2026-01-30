import { Outlet } from "react-router-dom";
import { Board } from "./Board";
import { LogoWrapper, Logo } from "./Logo.styles";

export function PageLayout() {
    return (
        <div>
            <LogoWrapper>
                <Logo src="/logo.png" alt="Logo" />
            </LogoWrapper>
            <Board>
                <Outlet />
            </Board>
        </div>
    );
}
