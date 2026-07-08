import { Navigate } from 'react-router-dom';
import Layout from './Layout';

const ProtectedRoute = () => {
  // Simulación de autenticación
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
};

export default ProtectedRoute;