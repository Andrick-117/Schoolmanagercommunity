import { useState, useEffect } from "react";
import { Sidebar, Page, Role } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Students } from "./components/Students";
import { Classes } from "./components/Classes";
import { Attendance } from "./components/Attendance";
import { Grades } from "./components/Grades";
import { Schedule } from "./components/Schedule";
import { Login } from "./components/Login";
import { Teachers } from "./components/Teachers";
import { Enrollments } from "./components/Enrollments";
import { Billing } from "./components/Billing";
import { Bell, Search } from "lucide-react";

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard / Perfil Académico",
  students: "Estudiantes",
  teachers: "Docentes",
  courses: "Cursos",
  enrollments: "Inscripciones",
  attendance: "Asistencia",
  grades: "Calificaciones",
  schedule: "Horarios",
  billing: "Facturación Mensual",
};

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [activePage, setActivePage] = useState<Page>("dashboard");

  // On mount, check if we have a saved role
  useEffect(() => {
    const savedRole = localStorage.getItem("app_role") as Role;
    if (savedRole) {
      setRole(savedRole);
      setInitialPage(savedRole);
    }
  }, []);

  const setInitialPage = (r: Role) => {
    if (r === "admin") setActivePage("dashboard");
    else if (r === "teacher") setActivePage("courses");
    else if (r === "student") setActivePage("dashboard");
  };

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    localStorage.setItem("app_role", selectedRole);
    setInitialPage(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem("app_role");
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    // Basic route protection mock
    if (role === "student" && !["dashboard", "courses", "schedule", "grades", "attendance"].includes(activePage)) {
      setActivePage("dashboard");
      return null;
    }
    if (role === "teacher" && !["courses", "attendance", "grades", "schedule"].includes(activePage)) {
      setActivePage("courses");
      return null;
    }

    switch (activePage) {
      case "dashboard": return <Dashboard role={role} />;
      case "students": return <Students />;
      case "teachers": return <Teachers />;
      case "courses": return <Classes role={role} />;
      case "enrollments": return <Enrollments />;
      case "attendance": return <Attendance role={role} />;
      case "grades": return <Grades role={role} />;
      case "schedule": return <Schedule role={role} />;
      case "billing": return <Billing />;
      default: return <Dashboard role={role} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} role={role} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 flex-shrink-0 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 font-medium">Academia Nuevo Futuro</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-semibold">{pageTitles[activePage]}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Buscar..."
                className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
