import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PublicPage from './pages/PublicPage';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;