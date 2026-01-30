import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>hi</div>} />
        {/* Add more routes here as you create pages */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
