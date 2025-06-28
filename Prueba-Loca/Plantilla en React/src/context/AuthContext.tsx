// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';

// 1. Definimos los tipos de nuestro estado y acciones
interface User {
  id_user: number;
  name_user: string;
  maiden_name_user: string;
  email_user: string;
  password_user: string;
  username: string;
  role_user: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

type AuthAction =
  | { type: 'SET_AUTH'; payload: { user: User; token: string } }
  | { type: 'CLEAR_AUTH' };

// 2. Función para obtener el estado inicial de forma síncrona
const getInitialState = (): AuthState => {
  // Solo se ejecuta en el lado del cliente
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedUser) {
      try {
        return {
          user: JSON.parse(storedUser),
          token: storedToken,
        };
      } catch (error) {
        console.error('Error parsing stored user data', error);
        return {
          user: null,
          token: null,
        };
      }
    }
  }
  return {
    user: null,
    token: null,
  };
};

// 3. Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'CLEAR_AUTH':
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
}

// 4. Tipo del contexto
interface AuthContextProps extends AuthState {
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// 5. Crear el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 6. Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Inicializar el estado con la función síncrona
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  // Efecto solo para persistir cambios (NO para inicialización)
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [state]);

  const login = (user: User, token: string) => {
    dispatch({ type: 'SET_AUTH', payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: 'CLEAR_AUTH' });
  };

  const value: AuthContextProps = {
    user: state.user,
    token: state.token,
    isAuthenticated: Boolean(state.token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 7. Hook de consumo
export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return context;
}


