import React, { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import { useLanguage } from "../components/LanguageProvider";
import { getAllUsers, setUserRole, assignMentor } from "../services/admin-service";

const ROLES = ["student", "mentor", "admin"];

const ROLE_COLORS = {
  admin:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  mentor:  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  student: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

function UserRow({ user, mentors, onUpdate }) {
  const [role, setRole] = useState(user.role || "student");
  const [mentorId, setMentorId] = useState(user.mentorId || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await setUserRole(user.uid, role);
      await assignMentor(user.uid, mentorId || null);
      setSaved(true);
      onUpdate(user.uid, { role, mentorId: mentorId || null });
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  const changed = role !== (user.role || "student") || mentorId !== (user.mentorId || "");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 dark:text-white truncate">
            {user.displayName || "—"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5 font-mono">{user.uid}</p>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_COLORS[user.role] || ROLE_COLORS.student}`}>
          {user.role || "student"}
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        {/* Role selector */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Rol
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Mentor selector (only for students) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Mentor asignado
          </label>
          <select
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
            disabled={role !== "student"}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40"
          >
            <option value="">— Sin mentor —</option>
            {mentors.map((m) => (
              <option key={m.uid} value={m.uid}>
                {m.displayName || m.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Save button */}
      {changed && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      )}
      {saved && !changed && (
        <p className="mt-2 text-xs text-green-500 text-right">✓ Guardado</p>
      )}
    </div>
  );
}

function AdminDashboard() {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  function handleUpdate(uid, changes) {
    setUsers((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, ...changes } : u))
    );
  }

  const mentors = users.filter((u) => u.role === "mentor" || u.role === "admin");

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (u.displayName || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q)
    );
  });

  // Sort: admins first, then mentors, then students
  const sorted = [...filtered].sort((a, b) => {
    const order = { admin: 0, mentor: 1, student: 2 };
    return (order[a.role] ?? 2) - (order[b.role] ?? 2);
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Panel de Administración
        </h1>
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {users.length} usuarios
        </span>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Buscar por nombre, email o rol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No se encontraron usuarios.</p>
      ) : (
        <div className="space-y-4">
          {sorted.map((user) => (
            <UserRow
              key={user.uid}
              user={user}
              mentors={mentors}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard role="admin">
      <AdminDashboard />
    </AuthGuard>
  );
}

export function Head() {
  return <title>Admin | Voces de Esperanza</title>;
}
