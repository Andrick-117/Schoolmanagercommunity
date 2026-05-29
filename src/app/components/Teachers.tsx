import React, { useState } from "react";
import { Search, Plus, MoreHorizontal, Mail, Phone, Briefcase } from "lucide-react";

export function Teachers() {
  const [teachers] = useState([
    { id: "T001", name: "Carlos Mendoza", email: "cmendoza@nuevofuturo.edu", phone: "555-0101", dept: "Matemáticas", status: "Activo" },
    { id: "T002", name: "Ana Lucía Silva", email: "asilva@nuevofuturo.edu", phone: "555-0102", dept: "Ciencias", status: "Activo" },
    { id: "T003", name: "Roberto Gómez", email: "rgomez@nuevofuturo.edu", phone: "555-0103", dept: "Historia", status: "Inactivo" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de Docentes</h2>
          <p className="text-slate-500 text-sm">Administración del personal académico</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>Nuevo Docente</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar docente por nombre, ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-3 font-medium">Docente</th>
                <th className="px-6 py-3 font-medium">Contacto</th>
                <th className="px-6 py-3 font-medium">Departamento</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{teacher.name}</div>
                        <div className="text-slate-500 text-xs">ID: {teacher.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={14} /> <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} /> <span>{teacher.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Briefcase size={14} className="text-slate-400" />
                      {teacher.dept}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      teacher.status === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreHorizontal size={18} />
                    </button>
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
