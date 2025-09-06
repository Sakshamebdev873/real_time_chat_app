
// In App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Homepage';
import AuthPage from '../src/pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} /> 
        {/* Or name the route /login, /signup, etc. */}
      </Routes>
    </Router>
  );
}
export default App