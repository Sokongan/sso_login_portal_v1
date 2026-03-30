import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/Dashboard";
import { AppLayout } from "./components/layout/AppLayout";
import { FormsPage } from "./pages/Forms";
import { BirthdayPage } from "./pages/Birthday";
import { ProvidentFundPage } from "./pages/ProvidentFund";
import { IssuedEquipmentPage } from "./pages/IssuedEquipment";
import { RequestPage } from "./pages/Request";
import { SalnPage } from "./pages/Saln";
import Leave from "./pages/Leave";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">This module is ready for implementation.</p>
    </div>
  );
}

export default function App() {
  const isAuthed = true;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={isAuthed ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="email" element={<PlaceholderPage title="Email" />} />
          <Route path="directory" element={<PlaceholderPage title="Directory" />} />
          <Route path="forms" element={<FormsPage /> } />
          <Route path="birthday" element={<BirthdayPage /> } />
          <Route path="payslip" element={<PlaceholderPage title="Payslip" />} />
          <Route path="provident-fund" element={<ProvidentFundPage />} />
          <Route path="issued-equipment" element={<IssuedEquipmentPage />} />
          <Route path="saln" element={<SalnPage />} />
          <Route path="request" element={<RequestPage />} />
          <Route path="leave" element={<Leave/>} />
          <Route path="support" element={<PlaceholderPage title="Support" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="admin" element={<PlaceholderPage title="Administration" />} />
          <Route path="admin/config" element={<PlaceholderPage title="Config" />} />
          <Route path="admin/config/roles" element={<PlaceholderPage title="Roles & permissions" />} />
          <Route path="admin/config/apps" element={<PlaceholderPage title="App access" />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthed ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
