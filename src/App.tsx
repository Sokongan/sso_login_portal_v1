import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/pages/Error/page';
import LoginPage from './components/pages/Login/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
