import { AuthGate } from '@/components/auth/AuthGate';
import { Navigate } from 'react-router-dom';


export default function Landing() {
  return (
    <AuthGate
      autoRedirect
      title="Welcome"
      subtitle="Redirecting to single sign-on."
    >
      <Navigate to="/dashboard" replace />
    </AuthGate>
  );
}
