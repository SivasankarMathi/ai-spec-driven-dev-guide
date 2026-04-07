import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/home/Sidebar';
import BottomNav from '../components/home/BottomNav';
import UserCard from '../components/settings/UserCard';
import SettingsMenu from '../components/settings/SettingsMenu';
import ProfileView from '../components/settings/ProfileView';
import AppearanceView from '../components/settings/AppearanceView';
import ChangePasswordModal from '../components/settings/ChangePasswordModal';
import LogOutButton from '../components/settings/LogOutButton';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useToast } from '../components/ui/Toast';
import styles from '../components/settings/settings.module.css';

type View = 'settings' | 'profile' | 'appearance';

interface SettingsPageProps {
  initialView?: View;
}

export default function SettingsPage({ initialView = 'settings' }: SettingsPageProps) {
  const [currentView, setCurrentView] = useState<View>(initialView);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = useNavigate();
  const { user, logout, updateUsername, changePassword } = useAuth();
  const { theme, fontSize, setTheme, setFontSize } = useSettings();
  const { showToast } = useToast();

  const handleNavigate = useCallback((view: 'profile' | 'appearance') => {
    setCurrentView(view);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('settings');
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/auth/signin');
  }, [logout, navigate]);

  const handleUsernameChange = useCallback((newName: string) => {
    updateUsername(newName);
    showToast('Username updated', 'success');
  }, [updateUsername, showToast]);

  const handleChangePassword = useCallback(async (current: string, newPw: string) => {
    const result = await changePassword(current, newPw);
    if (result.success) {
      showToast('Password changed successfully', 'success');
    }
    return result;
  }, [changePassword, showToast]);

  if (!user) return null;

  return (
    <div className={styles.appLayout}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`${styles.mainContent} ${sidebarCollapsed ? styles.mainContentCollapsed : ''}`}>
        {/* Settings Main View */}
        <div className={`${styles.settingsView} ${currentView === 'settings' ? styles.settingsViewActive : ''}`}>
          <header className={styles.viewHeader}>
            <h2 className={styles.viewHeader__title}>Settings</h2>
          </header>

          <UserCard user={user} />
          <SettingsMenu onNavigate={handleNavigate} />
          <LogOutButton onLogout={handleLogout} />
        </div>

        {/* Profile View */}
        <div className={`${styles.settingsView} ${currentView === 'profile' ? styles.settingsViewActive : ''}`}>
          {currentView === 'profile' && (
            <ProfileView
              user={user}
              onUsernameChange={handleUsernameChange}
              onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
              onBack={handleBack}
            />
          )}
        </div>

        {/* Appearance View */}
        <div className={`${styles.settingsView} ${currentView === 'appearance' ? styles.settingsViewActive : ''}`}>
          {currentView === 'appearance' && (
            <AppearanceView
              theme={theme}
              fontSize={fontSize}
              onThemeChange={setTheme}
              onFontSizeChange={setFontSize}
              onBack={handleBack}
            />
          )}
        </div>
      </main>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        email={user.email}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />

      <BottomNav />
    </div>
  );
}
