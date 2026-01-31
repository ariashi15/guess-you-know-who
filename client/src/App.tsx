import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./pages/Home";
import { WaitingRoom } from "./pages/WaitingRoom";
import { GamePage } from "./pages/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="waiting-room/:gameCode" element={<WaitingRoom />}/>
          <Route path="play/:gameCode" element={<GamePage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
