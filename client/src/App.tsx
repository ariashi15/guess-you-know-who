import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { SetupGamePage } from "./components/SetupGamePage";
import { WaitingRoom } from "./components/WaitingRoom";
import { CreateGameOptions } from "./components/CreateGameOptions";

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
