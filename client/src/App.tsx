import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { SetupGamePage } from "./pages/SetupGamePage";
import { WaitingRoom } from "./pages/WaitingRoom";
import { CreateGameOptions } from "./pages/CreateGameOptions";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="/" element={<SetupGamePage />}>
              <Route index element={<CreateGameOptions />}/>
              <Route path="waiting-room" element={<WaitingRoom />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
