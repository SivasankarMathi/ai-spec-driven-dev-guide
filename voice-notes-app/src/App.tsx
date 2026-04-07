import { Routes, Route, Navigate } from 'react-router-dom';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { NotesProvider } from './contexts/NotesContext';
import { ToastProvider } from './components/ui/Toast';
import ProtectedRoute from './components/ui/ProtectedRoute';
import RootRedirect from './components/ui/RootRedirect';
import OnboardingPage from './pages/OnboardingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import RecorderPage from './pages/RecorderPage';
import NoteEditorPage from './pages/NoteEditorPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <SettingsProvider>
          <NotesProvider>
            <ToastProvider>
              <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/auth/signup" element={<SignUpPage />} />
                <Route path="/auth/signin" element={<SignInPage />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/note/record"
                  element={
                    <ProtectedRoute>
                      <RecorderPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/note/new"
                  element={
                    <ProtectedRoute>
                      <NoteEditorPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/note/:id"
                  element={
                    <ProtectedRoute>
                      <NoteEditorPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/profile"
                  element={
                    <ProtectedRoute>
                      <SettingsPage initialView="profile" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/appearance"
                  element={
                    <ProtectedRoute>
                      <SettingsPage initialView="appearance" />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ToastProvider>
          </NotesProvider>
        </SettingsProvider>
      </AuthProvider>
    </DatabaseProvider>
  );
}

export default App;
