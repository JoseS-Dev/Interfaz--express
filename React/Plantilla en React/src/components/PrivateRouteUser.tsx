import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { axiosInstance } from '../context/axiosInstances'; 
import { AxiosInstance } from 'axios';
import React,{ useState, useEffect } from 'react';

const verifyUser = async (axiosInstance: AxiosInstance, user: any, setLoading: (loading: boolean) => void, setAuthenticated: (authenticated: boolean) => void, logout: () => void) => {
    try {
        const response = await axiosInstance.post('/Users/verify', { user });
        const status = response.status;
        setAuthenticated(status === 200);
        setLoading(false);
    } catch (error) {
        console.error('Error verifying user:', error);
        setAuthenticated(false);
        setLoading(false);
        logout();
    }
};

export default function PrivateRouteUser() {
  const {user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Verifica si el usuario está autenticado
    verifyUser(axiosInstance, user, setLoading, setAuthenticated, logout);
  }, []);

  // Si no está autenticado, redirige a /
  if (!authenticated && !loading) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else if (authenticated && !loading) {
    // Si está autenticado, renderiza el componente hijo
    return <Outlet />;
  }
  else if (loading){
    // Si está cargando, muestra un mensaje de carga
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
    </div>;
  }
} 