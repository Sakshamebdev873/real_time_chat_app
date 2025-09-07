
// In App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../src/pages/Homepage';
import AuthPage from '../src/pages/AuthPage';
import FeaturesPage from './pages/FeaturePage';
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';
import GroupsPage from './pages/GroupPage';
import SettingsPage from './pages/SettingsPage';


function App() {
  return (

      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} /> 
          <Route path="/features" element={<FeaturesPage />} /> {/* <-- Add this */}
        <Route path="/pricing" element={<PricingPage />} />   {/* <-- Add this */}
        <Route path="/contact" element={<ContactPage />} />   {/* <-- Add this */}
     
          {/* This route handles all chat views, both DMs and Groups */}
        <Route path="/chat/:type/:id" element={<ChatPage />} />

        {/* A fallback route for "/chat" to redirect to a default chat */}
        <Route path="/chat" element={<Navigate to="/chat/group/2" />} />
         <Route path="/settings" element={<SettingsPage />}/>
         <Route path="/groups" element={<GroupsPage />} />
      </Routes>
    </Router>
   
  );
}
export default App