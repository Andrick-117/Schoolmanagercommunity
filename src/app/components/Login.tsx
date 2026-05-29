import React from "react";
import { ShieldAlert, BookOpen, GraduationCap, School } from "lucide-react";

export type Role = "admin" | "teacher" | "student";

interface LoginProps {
  onLogin: (role: Role) => void;
}

export function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <School className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Academia Nuevo Futuro</h1>
          <p className="text-slate-500">Selecciona tu perfil para ingresar al sistema (Modo Demo)</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onLogin("admin")}
            className="w-full flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="ml-4 text-left">
              <div className="font-semibold text-slate-900">Administrador</div>
              <div className="text-sm text-slate-500">Control total del sistema</div>
            </div>
          </button>

          <button
            onClick={() => onLogin("teacher")}
            className="w-full flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="ml-4 text-left">
              <div className="font-semibold text-slate-900">Docente</div>
              <div className="text-sm text-slate-500">Gestión de notas y asistencia</div>
            </div>
          </button>

          <button
            onClick={() => onLogin("student")}
            className="w-full flex items-center p-4 rounded-xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="ml-4 text-left">
              <div className="font-semibold text-slate-900">Estudiante</div>
              <div className="text-sm text-slate-500">Consulta académica y perfil</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
