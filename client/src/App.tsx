import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { SetupGamePage } from "./components/SetupGamePage";
// import { CreateGameOptions } from "./pages/CreateGameOptions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<SetupGamePage />}>
            {/* <Route index element={<CreateGameOptions />}/> */}
            {/* <Route path="waitingroom" element=<WaitingRoom />}> */}
          </Route>
          {/* Add more routes here as you create pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
