import React, { useState } from "react";
import { UserCheck, Search, Filter } from "lucide-react";

export function Enrollments() {
  const [enrollments] = useState([
    { id: "E001", student: "María López", course: "Matemáticas Avanzadas", date: "2026-05-20", status: "Inscrito" },
    { id: "E002", student: "Juan Pérez", course: "Ciencias Básicas", date: "2026-05-21", status: "Pendiente" },
    { id: "E003", student: "Lucía Ramírez", course: "Historia Universal", date: "2026-05-22", status: "Inscrito" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inscripciones</h2>
          <p className="text-slate-500 text-sm">Asignación de estudiantes a cursos</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <UserCheck size={18} />
          <span>Nueva Inscripción</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar inscripción..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 text-sm">
            <Filter size={16} />
            <span>Filtros</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Estudiante</th>
                <th className="px-6 py-3 font-medium">Curso</th>
                <th className="px-6 py-3 font-medium">Fecha</th>
                <th className="px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-600">{enrollment.id}</td>
                  <td className="px-6 py-4 text-slate-800">{enrollment.student}</td>
                  <td className="px-6 py-4 text-slate-700">{enrollment.course}</td>
                  <td className="px-6 py-4 text-slate-500">{enrollment.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      enrollment.status === "Inscrito" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {enrollment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
