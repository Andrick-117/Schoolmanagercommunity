import React, { useState } from "react";
import { Download, FileText, Search, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";

export function Billing() {
  const [formData, setFormData] = useState({
    responsable: "",
    dpi: "",
    nit: "",
    estudiante: "",
    monto: "500",
    mes: "Mayo 2026",
  });

  const handleGeneratePDF = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue 600
    doc.text("Academia Nuevo Futuro", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text("Recibo de Mensualidad Escolar", 105, 30, { align: "center" });
    
    // Details
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42); // Slate 900
    
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.text(`Responsable: ${formData.responsable}`, 20, 60);
    doc.text(`DPI: ${formData.dpi}`, 20, 70);
    doc.text(`NIT: ${formData.nit || "C/F"}`, 20, 80);
    
    doc.text(`Estudiante: ${formData.estudiante}`, 20, 100);
    doc.text(`Mes de Pago: ${formData.mes}`, 20, 110);
    
    // Total Box
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.rect(20, 130, 170, 30, "FD");
    
    doc.setFontSize(16);
    doc.text("Total Pagado:", 30, 150);
    doc.setFont("helvetica", "bold");
    doc.text(`Q${formData.monto}.00`, 150, 150);
    
    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("Este es un comprobante de pago válido. ¡Gracias por confiar en nosotros!", 105, 280, { align: "center" });
    
    doc.save(`Recibo_${formData.mes.replace(" ", "_")}_${formData.estudiante.replace(" ", "")}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Facturación y Mensualidad</h2>
          <p className="text-slate-500 text-sm">Emisión de recibos y cobro global escolar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Generar Recibo
            </h3>
            
            <form onSubmit={handleGeneratePDF} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Responsable</label>
                <input
                  required
                  type="text"
                  value={formData.responsable}
                  onChange={(e) => setFormData({...formData, responsable: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">DPI</label>
                  <input
                    required
                    type="text"
                    value={formData.dpi}
                    onChange={(e) => setFormData({...formData, dpi: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 56789 0101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">NIT</label>
                  <input
                    type="text"
                    value={formData.nit}
                    onChange={(e) => setFormData({...formData, nit: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="C/F si es vacío"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Estudiante</label>
                <input
                  required
                  type="text"
                  value={formData.estudiante}
                  onChange={(e) => setFormData({...formData, estudiante: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Carlos Pérez"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mes de Pago</label>
                  <select
                    value={formData.mes}
                    onChange={(e) => setFormData({...formData, mes: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Mayo 2026</option>
                    <option>Junio 2026</option>
                    <option>Julio 2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Monto (Q)</label>
                  <input
                    type="number"
                    value={formData.monto}
                    onChange={(e) => setFormData({...formData, monto: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Download size={18} />
                Generar PDF y Registrar
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-800">Historial de Pagos Recientes</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Buscar recibo..."
                  className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="px-6 py-3 font-medium">Recibo</th>
                    <th className="px-6 py-3 font-medium">Estudiante</th>
                    <th className="px-6 py-3 font-medium">Mes</th>
                    <th className="px-6 py-3 font-medium">Monto</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: "REC-2026-001", student: "María López", month: "Mayo 2026", amount: 500, status: "Pagado" },
                    { id: "REC-2026-002", student: "Juan Pérez", month: "Mayo 2026", amount: 500, status: "Pagado" },
                    { id: "REC-2026-003", student: "Lucía Ramírez", month: "Mayo 2026", amount: 500, status: "Pagado" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-700">{row.id}</td>
                      <td className="px-6 py-4 text-slate-600">{row.student}</td>
                      <td className="px-6 py-4 text-slate-500">{row.month}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">Q{row.amount}.00</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2.5 py-1 rounded-full w-max">
                          <CheckCircle size={12} /> Pagado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
