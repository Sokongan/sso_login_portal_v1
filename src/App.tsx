import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login/page';
import Dashboard from './components/pages/Authenticated/Dashboard/page';
import AdminPage from './components/pages/Authenticated/Admin/page';
import AdminUsersCreatePage from './components/pages/Authenticated/AdminUsersCreate/page';
import AdminConfigRolesPage from './components/pages/Authenticated/AdminConfigRoles/page';
import AdminConfigAppsPage from './components/pages/Authenticated/AdminConfigApps/page';
import AccountSettingsPage from './components/pages/Authenticated/Settings/page';
import Callback from './components/pages/Callback/page';
// import Consent from './components/pages/Consent/page';
import { SessionProvider, useSession } from './context/SessionContext';
import Landing from './components/pages/Default/page';
import ErrorPage from './components/pages/Error/page';
import { ThemeProvider } from './components/theme-provider';
import { JSX } from 'react';
import { AuthGate } from './components/auth/AuthGate';


function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}

function RedirectIfAuthed({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
  <ThemeProvider defaultTheme="system" storageKey="sso-ui-theme">
      <SessionProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/login"
                element={
                  <RedirectIfAuthed>
                    <Login />
                  </RedirectIfAuthed>
                }
              />
              <Route path="/callback" element={<Callback />} />
              {/* <Route path="/consent" element={<Consent />} /> */}
              <Route path="/" element={<Landing />} />
              <Route
                path="/dashboard"
                element={
                  <AuthGate
                    title="Session required"
                    subtitle="Sign in with your SSO account to access the dashboard."
                  >
                    <Dashboard />
                  </AuthGate>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthGate
                    title="Session required"
                    subtitle="Sign in with your SSO account to manage your identity settings."
                  >
                    <AccountSettingsPage />
                  </AuthGate>
                }
              />
              <Route
                path="/admin"
                element={
                  <AuthGate
                    title="Session required"
                    subtitle="Sign in with your SSO account to access the admin console."
                  >
                    <AdminPage />
                  </AuthGate>
                }
              />
              <Route
                path="/admin/users/new"
                element={
                  <AuthGate
                    title="Session required"
                    subtitle="Sign in with your SSO account to create admin users."
                  >
                    <AdminUsersCreatePage />
                  </AuthGate>
                }
              />
              <Route
                path="/admin/config"
                element={<Navigate to="/admin/config/roles" replace />}
              />
              <Route
                path="/admin/config/roles"
                element={
                  <AuthGate
                    title="Session required"
                    subtitle="Sign in with your SSO account to manage roles and permissions."
                  >
                    <AdminConfigRolesPage />
                  </AuthGate>
                }
              />
              <Route
                path="/admin/config/apps"
                element={
                  <AuthGate
                    title="Session required"
                    subtitle="Sign in with your SSO account to manage allowed applications."
                  >
                    <AdminConfigAppsPage />
                  </AuthGate>
                }
              />
              <Route path="/flow/error" element={<ErrorPage />} />
            </Routes>
          </div>
        </Router>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
