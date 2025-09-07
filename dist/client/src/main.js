import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(_jsxs(StrictMode, { children: [_jsx(Toaster, { position: "top-center" }), _jsx(App, {})] }));
//# sourceMappingURL=main.js.map