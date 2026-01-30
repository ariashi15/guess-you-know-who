import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          {/* Add more routes here as you create pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
