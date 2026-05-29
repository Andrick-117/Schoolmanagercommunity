import { Users, BookOpen, CalendarCheck, TrendingUp, ArrowUp, ArrowDown, Clock, Star, GraduationCap, Calendar, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Role } from "./Sidebar";

interface DashboardProps {
  role?: Role;
}

const attendanceData = [
  { month: "Jan", rate: 94 },
  { month: "Feb", rate: 96 },
  { month: "Mar", rate: 92 },
  { month: "Apr", rate: 97 },
  { month: "May", rate: 95 },
  { month: "Jun", rate: 98 },
];

const gradeDistribution = [
  { grade: "A", count: 142 },
  { grade: "B", count: 198 },
  { grade: "C", count: 87 },
  { grade: "D", count: 34 },
  { grade: "F", count: 12 },
];

export function Dashboard({ role = "admin" }: DashboardProps) {
  if (role === "student") {
    return <StudentDashboard />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Administrativo</h1>
        <p className="text-slate-500 text-sm">Resumen de la actividad en Academia Nuevo Futuro.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Estudiantes", value: "1,248", change: "+12", up: true, icon: Users, color: "#2563eb", bg: "#dbeafe" },
          { label: "Cursos Activos", value: "42", change: "+3", up: true, icon: BookOpen, color: "#10b981", bg: "#d1fae5" },
          { label: "Tasa de Asistencia", value: "96.2%", change: "+1.4%", up: true, icon: CalendarCheck, color: "#8b5cf6", bg: "#ede9fe" },
          { label: "Promedio Global", value: "85/100", change: "-0.5", up: false, icon: TrendingUp, color: "#f59e0b", bg: "#fef3c7" },
        ].map(({ label, value, change, up, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} color={color} />
              </div>
              <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                {change}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800 leading-tight">{value}</div>
            <div className="text-sm text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Tendencia de Asistencia</h3>
          <p className="text-xs text-slate-500 mb-6">Porcentaje mensual</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis domain={[88, 100]} tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2.5} fill="url(#attendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Distribución de Notas</h3>
          <p className="text-xs text-slate-500 mb-6">Semestre actual</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gradeDistribution} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="grade" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
          <GraduationCap size={40} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hola, Estudiante de Demo</h1>
          <p className="text-slate-500">ID: EST-2026-001 | Grado: 10mo | Sección B</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><BookOpen size={20}/></div>
            <h3 className="font-semibold text-slate-800">Cursos Actuales</h3>
          </div>
          <div className="text-3xl font-bold text-slate-800">6</div>
          <p className="text-sm text-slate-500">Inscritos este semestre</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600"><TrendingUp size={20}/></div>
            <h3 className="font-semibold text-slate-800">Promedio General</h3>
          </div>
          <div className="text-3xl font-bold text-slate-800">92/100</div>
          <p className="text-sm text-slate-500">Rendimiento Excelente</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><CalendarCheck size={20}/></div>
            <h3 className="font-semibold text-slate-800">Asistencia</h3>
          </div>
          <div className="text-3xl font-bold text-slate-800">98%</div>
          <p className="text-sm text-slate-500">2 ausencias justificadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-slate-400" />
            Clases de Hoy
          </h3>
          <ul className="space-y-3">
            {[
              { time: "08:00 AM", subject: "Matemáticas Avanzadas", room: "Aula 301" },
              { time: "09:30 AM", subject: "Historia Universal", room: "Aula 204" },
              { time: "11:00 AM", subject: "Física", room: "Laboratorio 2" },
            ].map((c, i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{c.subject}</p>
                  <p className="text-xs text-slate-500">{c.room}</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={18} className="text-slate-400" />
            Últimas Notas
          </h3>
          <ul className="space-y-3">
            {[
              { subject: "Matemáticas", task: "Examen Parcial", score: "95/100" },
              { subject: "Historia", task: "Ensayo Revolución", score: "88/100" },
              { subject: "Inglés", task: "Presentación Oral", score: "100/100" },
            ].map((n, i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{n.subject}</p>
                  <p className="text-xs text-slate-500">{n.task}</p>
                </div>
                <span className="text-sm font-bold text-slate-700">{n.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
