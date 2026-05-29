import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const allStudents = [
  { id: 1, name: "Emma Johnson", grade: "12-A", gpa: 4.0, status: "Active", email: "emma.j@school.edu", phone: "555-0101", joined: "Sep 2020", initials: "EJ", color: "#2563eb" },
  { id: 2, name: "Liam Chen", grade: "11-B", gpa: 3.96, status: "Active", email: "liam.c@school.edu", phone: "555-0102", joined: "Sep 2021", initials: "LC", color: "#10b981" },
  { id: 3, name: "Aisha Patel", grade: "12-B", gpa: 3.92, status: "Active", email: "aisha.p@school.edu", phone: "555-0103", joined: "Sep 2020", initials: "AP", color: "#8b5cf6" },
  { id: 4, name: "Noah Williams", grade: "10-A", gpa: 3.88, status: "Active", email: "noah.w@school.edu", phone: "555-0104", joined: "Sep 2022", initials: "NW", color: "#f59e0b" },
  { id: 5, name: "Sofia Martinez", grade: "10-A", gpa: 3.75, status: "Active", email: "sofia.m@school.edu", phone: "555-0105", joined: "Sep 2022", initials: "SM", color: "#ef4444" },
  { id: 6, name: "Jackson Lee", grade: "11-A", gpa: 3.68, status: "Active", email: "jackson.l@school.edu", phone: "555-0106", joined: "Sep 2021", initials: "JL", color: "#06b6d4" },
  { id: 7, name: "Olivia Brown", grade: "9-C", gpa: 3.55, status: "Active", email: "olivia.b@school.edu", phone: "555-0107", joined: "Sep 2023", initials: "OB", color: "#ec4899" },
  { id: 8, name: "Ethan Davis", grade: "12-A", gpa: 3.42, status: "Inactive", email: "ethan.d@school.edu", phone: "555-0108", joined: "Sep 2020", initials: "ED", color: "#64748b" },
  { id: 9, name: "Mia Wilson", grade: "9-B", gpa: 3.38, status: "Active", email: "mia.w@school.edu", phone: "555-0109", joined: "Sep 2023", initials: "MW", color: "#f97316" },
  { id: 10, name: "Lucas Anderson", grade: "10-B", gpa: 3.20, status: "Active", email: "lucas.a@school.edu", phone: "555-0110", joined: "Sep 2022", initials: "LA", color: "#84cc16" },
  { id: 11, name: "Ava Thomas", grade: "11-B", gpa: 3.15, status: "Active", email: "ava.t@school.edu", phone: "555-0111", joined: "Sep 2021", initials: "AT", color: "#a78bfa" },
  { id: 12, name: "James Garcia", grade: "9-A", gpa: 2.98, status: "Probation", email: "james.g@school.edu", phone: "555-0112", joined: "Sep 2023", initials: "JG", color: "#fbbf24" },
];

const PAGE_SIZE = 8;

export function Students() {
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const grades = ["All", "9-A", "9-B", "9-C", "10-A", "10-B", "11-A", "11-B", "12-A", "12-B"];
  const statuses = ["All", "Active", "Inactive", "Probation"];

  const filtered = allStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = filterGrade === "All" || s.grade === filterGrade;
    const matchesStatus = filterStatus === "All" || s.status === filterStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusColor = (status: string) => {
    if (status === "Active") return { bg: "#d1fae5", color: "#059669" };
    if (status === "Inactive") return { bg: "#f1f5f9", color: "#64748b" };
    return { bg: "#fef3c7", color: "#d97706" };
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: "var(--foreground)", marginBottom: 2 }}>Students</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{allStudents.length} students enrolled</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)", fontSize: "0.875rem" }}
        >
          <Plus size={16} />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 flex flex-wrap gap-3 items-center" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search students..."
            className="w-full pl-9 pr-3 py-2 rounded-lg outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--foreground)" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} style={{ color: "var(--muted-foreground)" }} />
          <select
            value={filterGrade}
            onChange={e => { setFilterGrade(e.target.value); setPage(1); }}
            className="py-2 px-3 rounded-lg outline-none cursor-pointer"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--foreground)" }}
          >
            {grades.map(g => <option key={g}>{g}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="py-2 px-3 rounded-lg outline-none cursor-pointer"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--foreground)" }}
          >
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "#f8fafc" }}>
              {["Student", "Grade", "GPA", "Status", "Contact", "Enrolled", ""].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((s, idx) => {
              const sc = statusColor(s.status);
              return (
                <tr key={s.id} style={{ borderBottom: idx < paginated.length - 1 ? "1px solid var(--border)" : "none" }}
                  className="hover:bg-slate-50 transition-colors">
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: s.color }}>
                        {s.initials}
                      </div>
                      <div>
                        <p style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{s.name}</p>
                        <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "0.875rem", color: "var(--foreground)" }}>Grade {s.grade}</td>
                  <td style={{ padding: "12px 16px", fontSize: "0.875rem", fontWeight: 600, color: s.gpa >= 3.5 ? "#059669" : s.gpa >= 3.0 ? "#d97706" : "#dc2626" }}>{s.gpa.toFixed(2)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: sc.bg, color: sc.color }}>{s.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded hover:bg-slate-100 transition-colors" title={s.email}><Mail size={14} style={{ color: "var(--muted-foreground)" }} /></button>
                      <button className="p-1.5 rounded hover:bg-slate-100 transition-colors" title={s.phone}><Phone size={14} style={{ color: "var(--muted-foreground)" }} /></button>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{s.joined}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button className="p-1.5 rounded hover:bg-slate-100 transition-colors"><MoreHorizontal size={16} style={{ color: "var(--muted-foreground)" }} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-1.5 rounded hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronLeft size={16} style={{ color: "var(--muted-foreground)" }} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className="w-7 h-7 rounded text-xs font-medium transition-colors"
                style={{ background: page === n ? "var(--primary)" : "transparent", color: page === n ? "white" : "var(--muted-foreground)" }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setShowAddModal(false)}>
          <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: "white" }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "var(--foreground)", marginBottom: 20 }}>Add New Student</h2>
            <div className="space-y-4">
              {[
                { label: "Full Name", placeholder: "e.g. John Smith" },
                { label: "Email", placeholder: "john.s@school.edu" },
                { label: "Phone", placeholder: "555-0000" },
              ].map(({ label, placeholder }) => (
                <div key={label}>
                  <label style={{ color: "var(--foreground)", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>{label}</label>
                  <input placeholder={placeholder} className="w-full px-3 py-2 rounded-lg outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--foreground)" }} />
                </div>
              ))}
              <div>
                <label style={{ color: "var(--foreground)", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Grade</label>
                <select className="w-full px-3 py-2 rounded-lg outline-none cursor-pointer"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--foreground)" }}>
                  {grades.filter(g => g !== "All").map(g => <option key={g}>Grade {g}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-lg transition-colors"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--primary)", fontSize: "0.875rem" }}>
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
