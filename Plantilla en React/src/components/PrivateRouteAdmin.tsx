import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../context/axiosInstances';
import { AxiosInstance } from 'axios';
import { useState, useEffect } from 'react';

const verifyAdmin = async (axiosInstance: AxiosInstance, user: any, setLoading: (loading: boolean) => void, setAuthenticated: (authenticated: boolean) => void) => {
    try {
        const response1 = await axiosInstance.post('/Users/verify', { user });
        const status1 = response1.status;
        const response2 = await axiosInstance.get('/Users/Role/admin');
        const data = response2.data;
        const id_user = user?.id_user ?? ''; 
        const isAdmin = data.users.some((user: any) => user.id_user === id_user);
        setAuthenticated(status1 === 200 && isAdmin);
        setLoading(false);

    } catch (error) {
        console.error('Error verifying admin:', error);
        setAuthenticated(false);
        setLoading(false);
    }
};

export default function PrivateRouteAdmin() {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Verifica si el usuario es administrador
    verifyAdmin(axiosInstance, user, setLoading, setAuthenticated);
  }, []);

  // Si no está autenticado, redirige a /login
  if (!authenticated && !loading) {
    // guardamos en state la ruta a la que quería ir
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else if (authenticated && !loading) {
    // Si está autenticado, renderiza el componente hijo
    return <Outlet />;
  }
  else if (loading){
    // Si está cargando, muestra un mensaje de carga
    return <div>Loading...</div>;
  }
}
