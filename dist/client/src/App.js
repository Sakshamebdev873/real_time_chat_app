import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// In App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../src/pages/Homepage';
import AuthPage from '../src/pages/AuthPage';
import FeaturesPage from './pages/FeaturePage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';
import GroupsPage from './pages/GroupPage';
import SettingsPage from './pages/SettingsPage';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/features", element: _jsx(FeaturesPage, {}) }), " ", _jsx(Route, { path: "/pricing", element: _jsx(PricingPage, {}) }), "   ", _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), "   ", _jsx(Route, { path: "/chat/:type/:id", element: _jsx(ChatPage, {}) }), _jsx(Route, { path: "/chat", element: _jsx(Navigate, { to: "/chat/group/2" }) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "/groups", element: _jsx(GroupsPage, {}) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map