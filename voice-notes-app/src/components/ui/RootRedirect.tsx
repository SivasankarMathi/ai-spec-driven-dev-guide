import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function RootRedirect() {
  const { isAuthenticated } = useAuth();
  const hasVisited = localStorage.getItem('SyncNotess_has_visited');

  if (!hasVisited) {
    return <Navigate to="/onboarding" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/auth/signin" replace />;
}
