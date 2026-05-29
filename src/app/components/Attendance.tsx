import { useState } from "react";
import { Calendar as CalendarIcon, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Role } from "./Sidebar";

interface AttendanceProps {
  role?: Role;
}

export function Attendance({ role = "admin" }: AttendanceProps) {
  const isStudent = role === "student";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isStudent ? "Mi Asistencia" : "Control de Asistencia"}
          </h1>
          <p className="text-slate-500 text-sm">
            {isStudent ? "Consulta tu récord de asistencia a clases." : "Registro diario de asistencia por curso."}
          </p>
        </div>
        {!isStudent && (
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <button className="p-1 hover:bg-slate-100 rounded-md text-slate-500"><ChevronLeft size={18} /></button>
            <div className="flex items-center gap-2 font-medium text-slate-700 text-sm">
              <CalendarIcon size={16} className="text-blue-600" />
              29 de Mayo, 2026
            </div>
            <button className="p-1 hover:bg-slate-100 rounded-md text-slate-500"><ChevronRight size={18} /></button>
          </div>
        )}
      </div>

      {isStudent ? (
        <StudentAttendance />
      ) : (
        <TeacherAdminAttendance role={role} />
      )}
    </div>
  );
}

function StudentAttendance() {
  const records = [
    { date: "29 May 2026", status: "Presente", course: "Matemáticas" },
    { date: "28 May 2026", status: "Presente", course: "Historia" },
    { date: "27 May 2026", status: "Ausente", course: "Física" },
    { date: "26 May 2026", status: "Tarde", course: "Inglés" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
          <div className="text-sm font-medium text-slate-700">Asistencia Global</div>
          <p className="text-xs text-slate-500 mt-1">Este semestre</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Presente</span>
            <span className="font-semibold text-slate-800">45 clases</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 flex items-center gap-2"><AlertCircle size={16} className="text-yellow-500"/> Tardanzas</span>
            <span className="font-semibold text-slate-800">2 clases</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 flex items-center gap-2"><XCircle size={16} className="text-red-500"/> Ausencias</span>
            <span className="font-semibold text-slate-800">1 clase</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Historial Reciente</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="px-6 py-3 font-medium">Fecha</th>
              <th className="px-6 py-3 font-medium">Curso</th>
              <th className="px-6 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.map((r, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-600">{r.date}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{r.course}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    r.status === "Presente" ? "bg-green-100 text-green-700" :
                    r.status === "Ausente" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeacherAdminAttendance({ role }: { role: Role }) {
  const [students, setStudents] = useState([
    { id: 1, name: "María López", status: "present" },
    { id: 2, name: "Juan Pérez", status: "absent" },
    { id: 3, name: "Lucía Ramírez", status: "late" },
    { id: 4, name: "Carlos Ruiz", status: "present" },
  ]);

  const updateStatus = (id: number, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50">
        <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 min-w-[200px]">
          {role === "teacher" ? (
             <option>Matemáticas Avanzadas (10mo B)</option>
          ) : (
            <>
              <option>Seleccionar Curso...</option>
              <option>Matemáticas Avanzadas (10mo B)</option>
              <option>Historia Universal (11vo A)</option>
            </>
          )}
        </select>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Buscar estudiante..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-slate-500 text-sm border-b border-slate-200">
              <th className="px-6 py-3 font-medium w-16">No.</th>
              <th className="px-6 py-3 font-medium">Estudiante</th>
              <th className="px-6 py-3 font-medium text-center">Asistencia</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {students.map((student, i) => (
              <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateStatus(student.id, "present")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                        student.status === "present" ? "bg-green-50 border-green-200 text-green-700 font-medium" : "border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <CheckCircle size={16} /> Presente
                    </button>
                    <button
                      onClick={() => updateStatus(student.id, "late")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                        student.status === "late" ? "bg-yellow-50 border-yellow-200 text-yellow-700 font-medium" : "border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <AlertCircle size={16} /> Tarde
                    </button>
                    <button
                      onClick={() => updateStatus(student.id, "absent")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                        student.status === "absent" ? "bg-red-50 border-red-200 text-red-700 font-medium" : "border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <XCircle size={16} /> Ausente
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Guardar Asistencia
        </button>
      </div>
    </div>
  );
}
