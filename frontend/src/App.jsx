import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Import your page components
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
