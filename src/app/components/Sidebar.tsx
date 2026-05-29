import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  BarChart2,
  Calendar,
  Settings,
  LogOut,
  GraduationCap,
  Bell,
  Briefcase,
  FileText,
  DollarSign,
  UserCheck
} from "lucide-react";

export type Role = "admin" | "teacher" | "student";

export type Page = 
  | "dashboard" 
  | "students" 
  | "teachers"
  | "courses"
  | "enrollments"
  | "attendance" 
  | "grades" 
  | "schedule"
  | "billing";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  role: Role;
  onLogout: () => void;
}

export function Sidebar({ activePage, onNavigate, role, onLogout }: SidebarProps) {
  // Define visibility by role
  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { id: "dashboard" as Page, label: "Dashboard", icon: LayoutDashboard },
          { id: "students" as Page, label: "Estudiantes", icon: Users },
          { id: "teachers" as Page, label: "Docentes", icon: Briefcase },
          { id: "courses" as Page, label: "Cursos", icon: BookOpen },
          { id: "enrollments" as Page, label: "Inscripciones", icon: UserCheck },
          { id: "attendance" as Page, label: "Asistencia", icon: CalendarCheck },
          { id: "grades" as Page, label: "Calificaciones", icon: BarChart2 },
          { id: "schedule" as Page, label: "Horarios", icon: Calendar },
          { id: "billing" as Page, label: "Facturación", icon: DollarSign },
        ];
      case "teacher":
        return [
          { id: "courses" as Page, label: "Mis Cursos", icon: BookOpen },
          { id: "attendance" as Page, label: "Asistencia", icon: CalendarCheck },
          { id: "grades" as Page, label: "Calificaciones", icon: BarChart2 },
          { id: "schedule" as Page, label: "Horarios", icon: Calendar },
        ];
      case "student":
        return [
          { id: "dashboard" as Page, label: "Mi Perfil Académico", icon: LayoutDashboard },
          { id: "courses" as Page, label: "Mis Cursos", icon: BookOpen },
          { id: "schedule" as Page, label: "Mi Horario", icon: Calendar },
          { id: "grades" as Page, label: "Mis Notas", icon: BarChart2 },
          { id: "attendance" as Page, label: "Mi Asistencia", icon: CalendarCheck },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const getRoleLabel = () => {
    switch(role) {
      case "admin": return "Administrador";
      case "teacher": return "Docente";
      case "student": return "Estudiante";
    }
  };

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-slate-900 text-slate-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-600">
          <GraduationCap size={20} color="white" />
        </div>
        <div>
          <div className="text-white font-semibold leading-tight text-sm">Nuevo Futuro</div>
          <div className="text-slate-400 opacity-80 text-xs">Control Académico</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="text-[0.68rem] font-semibold tracking-wider text-slate-500 uppercase px-3 pb-2">
          Menú Principal
        </div>
        <ul className="space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activePage === id;
            return (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-slate-200 text-slate-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Icon size={18} />
                  <span className={`text-sm ${isActive ? "font-semibold" : "font-normal"}`}>{label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-blue-600">
            {role.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">
              {role === "admin" ? "Admin" : role === "teacher" ? "Profesor" : "Estudiante"}
            </div>
            <div className="text-slate-400 text-xs">{getRoleLabel()}</div>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-white transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
