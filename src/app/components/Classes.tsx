import { useState } from "react";
import { Search, Plus, MoreHorizontal, Users, Clock, Calendar, BookOpen, User } from "lucide-react";
import { Role } from "./Sidebar";

interface ClassesProps {
  role?: Role;
}

const mockClasses = [
  { id: "MAT101", name: "Matemáticas Avanzadas", teacher: "Carlos Mendoza", grade: "10mo B", students: 28, schedule: "Lun, Mié, Vie 08:00 AM" },
  { id: "HIS201", name: "Historia Universal", teacher: "Roberto Gómez", grade: "11vo A", students: 24, schedule: "Mar, Jue 09:30 AM" },
  { id: "SCI105", name: "Ciencias Básicas", teacher: "Ana Lucía Silva", grade: "9no C", students: 30, schedule: "Lun, Mié 11:00 AM" },
  { id: "ENG301", name: "Inglés Avanzado", teacher: "Sarah Smith", grade: "12vo B", students: 22, schedule: "Mar, Jue 13:00 PM" },
];

export function Classes({ role = "admin" }: ClassesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const displayClasses = role === "teacher" 
    ? mockClasses.slice(0, 2) // Mock that teacher sees only 2 classes
    : role === "student"
    ? mockClasses.slice(0, 3) // Mock that student is in 3 classes
    : mockClasses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {role === "admin" ? "Gestión de Cursos" : role === "teacher" ? "Mis Cursos Asignados" : "Mis Cursos"}
          </h1>
          <p className="text-slate-500 text-sm">
            {role === "admin" ? "Administración de asignaturas y cursos de la academia." : "Consulta de cursos activos en el semestre."}
          </p>
        </div>
        {role === "admin" && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            <span>Nuevo Curso</span>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Buscar por código, nombre o docente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50"
          />
        </div>
        {role === "admin" && (
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600">
            <option value="">Todos los Grados</option>
            <option value="9">9no Grado</option>
            <option value="10">10mo Grado</option>
            <option value="11">11vo Grado</option>
            <option value="12">12vo Grado</option>
          </select>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 relative">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">
                  {cls.id}
                </span>
                {role === "admin" && (
                  <button className="text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={18} />
                  </button>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{cls.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{cls.grade}</p>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Docente</div>
                  <div className="font-medium text-slate-700">{cls.teacher}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users size={14} /> Estudiantes
                  </div>
                  <div className="text-sm font-medium text-slate-700">{cls.students} registrados</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={14} /> Horario
                  </div>
                  <div className="text-sm font-medium text-slate-700 line-clamp-1" title={cls.schedule}>{cls.schedule}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
