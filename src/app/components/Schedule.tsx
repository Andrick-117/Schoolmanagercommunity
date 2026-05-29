import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Role } from "./Sidebar";

const hours = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

interface ScheduleProps {
  role?: Role;
}

export function Schedule({ role = "admin" }: ScheduleProps) {
  const isStudent = role === "student";

  const getScheduleEvent = (day: string, hour: string) => {
    if (day === "Lunes" && hour === "08:00 AM") return { title: "Matemáticas", desc: "Aula 101", color: "bg-blue-100 text-blue-700 border-blue-200" };
    if (day === "Lunes" && hour === "10:00 AM") return { title: "Historia", desc: "Aula 204", color: "bg-amber-100 text-amber-700 border-amber-200" };
    if (day === "Miércoles" && hour === "08:00 AM") return { title: "Matemáticas", desc: "Aula 101", color: "bg-blue-100 text-blue-700 border-blue-200" };
    if (day === "Viernes" && hour === "11:00 AM") return { title: "Ciencias", desc: "Lab 1", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    if (day === "Martes" && hour === "09:00 AM") return { title: "Inglés", desc: "Aula 302", color: "bg-purple-100 text-purple-700 border-purple-200" };
    if (day === "Jueves" && hour === "09:00 AM") return { title: "Inglés", desc: "Aula 302", color: "bg-purple-100 text-purple-700 border-purple-200" };
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isStudent ? "Mi Horario" : "Horarios Escolares"}
          </h1>
          <p className="text-slate-500 text-sm">
            {isStudent ? "Tus clases programadas para esta semana." : "Planificación de clases y espacios de la academia."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <button className="p-1 hover:bg-slate-100 rounded-md text-slate-500"><ChevronLeft size={16} /></button>
            <span className="text-sm font-medium px-2 text-slate-700">Semana Actual</span>
            <button className="p-1 hover:bg-slate-100 rounded-md text-slate-500"><ChevronRight size={16} /></button>
          </div>
          {!isStudent && (
             <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
               <Plus size={16} />
               <span className="text-sm font-medium">Nueva Clase</span>
             </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="w-24 px-4 py-3 bg-slate-50 border-b border-r border-slate-200 text-center">
                  <Clock size={16} className="text-slate-400 mx-auto" />
                </th>
                {days.map((day) => (
                  <th key={day} className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-center font-semibold text-slate-700">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td className="px-2 py-4 bg-slate-50 border-b border-r border-slate-200 text-xs font-medium text-slate-500 text-center align-top w-24">
                    {hour}
                  </td>
                  {days.map((day) => {
                    const event = getScheduleEvent(day, hour);
                    return (
                      <td key={`${day}-${hour}`} className="p-2 border-b border-slate-100 align-top h-24 min-w-[140px] group relative hover:bg-slate-50">
                        {event ? (
                          <div className={`p-2 rounded-lg border ${event.color} h-full flex flex-col justify-between`}>
                            <div className="font-semibold text-sm leading-tight">{event.title}</div>
                            <div className="text-xs opacity-80 mt-1">{event.desc}</div>
                          </div>
                        ) : (
                          <div className="h-full rounded-lg border border-transparent border-dashed hover:border-slate-300 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                             {!isStudent && <Plus size={16} className="text-slate-400" />}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
