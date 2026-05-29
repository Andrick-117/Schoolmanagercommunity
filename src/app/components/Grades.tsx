import { useState } from "react";
import { Search, Download, Filter, FileText, CheckCircle } from "lucide-react";
import { Role } from "./Sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GradesProps {
  role?: Role;
}

const mockGradesData = [
  { student: "María López", math: 95, history: 88, science: 92, english: 100 },
  { student: "Juan Pérez", math: 85, history: 90, science: 88, english: 95 },
  { student: "Lucía Ramírez", math: 98, history: 95, science: 96, english: 92 },
  { student: "Carlos Ruiz", math: 75, history: 82, science: 80, english: 85 },
];

export function Grades({ role = "admin" }: GradesProps) {
  const isStudent = role === "student";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isStudent ? "Mis Calificaciones" : "Control de Calificaciones"}
          </h1>
          <p className="text-slate-500 text-sm">
            {isStudent ? "Consulta tu récord académico actual." : "Gestión y revisión de notas de los estudiantes."}
          </p>
        </div>
        {!isStudent && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={18} />
            <span>Exportar Reporte</span>
          </button>
        )}
      </div>

      {isStudent ? (
        <StudentGradesView />
      ) : (
        <TeacherAdminGradesView role={role} />
      )}
    </div>
  );
}

function StudentGradesView() {
  const chartData = [
    { subject: "Matemáticas", score: 95 },
    { subject: "Historia", score: 88 },
    { subject: "Ciencias", score: 92 },
    { subject: "Inglés", score: 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Boletín de Notas - Semestre I</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">Asignatura</th>
                <th className="px-6 py-3 font-medium">Parcial 1</th>
                <th className="px-6 py-3 font-medium">Parcial 2</th>
                <th className="px-6 py-3 font-medium">Proyecto</th>
                <th className="px-6 py-3 font-medium">Nota Final</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { s: "Matemáticas Avanzadas", p1: 90, p2: 95, pr: 100, f: 95 },
                { s: "Historia Universal", p1: 85, p2: 88, pr: 90, f: 88 },
                { s: "Ciencias Básicas", p1: 88, p2: 92, pr: 95, f: 92 },
                { s: "Inglés", p1: 100, p2: 100, pr: 100, f: 100 },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-700">{row.s}</td>
                  <td className="px-6 py-4 text-slate-600">{row.p1}</td>
                  <td className="px-6 py-4 text-slate-600">{row.p2}</td>
                  <td className="px-6 py-4 text-slate-600">{row.pr}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{row.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-6">Rendimiento por Asignatura</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TeacherAdminGradesView({ role }: { role: Role }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Buscar estudiante..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50"
          />
        </div>
        <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 min-w-[200px]">
          {role === "teacher" ? (
             <option>Mis Cursos - Matemáticas</option>
          ) : (
            <>
              <option>Todos los Cursos</option>
              <option>Matemáticas Avanzadas</option>
              <option>Historia Universal</option>
            </>
          )}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 text-sm transition-colors">
          <Filter size={16} />
          <span>Filtros</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <th className="px-6 py-3 font-medium">Estudiante</th>
              <th className="px-6 py-3 font-medium text-center">Matemáticas</th>
              <th className="px-6 py-3 font-medium text-center">Historia</th>
              <th className="px-6 py-3 font-medium text-center">Ciencias</th>
              <th className="px-6 py-3 font-medium text-center">Inglés</th>
              <th className="px-6 py-3 font-medium text-right">Promedio</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {mockGradesData.map((row, i) => {
              const avg = Math.round((row.math + row.history + row.science + row.english) / 4);
              return (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{row.student}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md ${row.math >= 90 ? 'bg-green-100 text-green-700' : row.math >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{row.math}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md ${row.history >= 90 ? 'bg-green-100 text-green-700' : row.history >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{row.history}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md ${row.science >= 90 ? 'bg-green-100 text-green-700' : row.science >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{row.science}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md ${row.english >= 90 ? 'bg-green-100 text-green-700' : row.english >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{row.english}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800">{avg}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
