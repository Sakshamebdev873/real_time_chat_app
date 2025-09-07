
// In App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Homepage';
import AuthPage from '../src/pages/AuthPage';
import FeaturesPage from './pages/FeaturePage';
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} /> 
          <Route path="/features" element={<FeaturesPage />} /> {/* <-- Add this */}
        <Route path="/pricing" element={<PricingPage />} />   {/* <-- Add this */}
        <Route path="/contact" element={<ContactPage />} />   {/* <-- Add this */}
      </Routes>
    </Router>
  );
}
export default App