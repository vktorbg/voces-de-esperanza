import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { useAuth } from "../components/AuthProvider";
import { useLanguage } from "../components/LanguageProvider";
import { registerUser, loginUser, logoutUser } from "../services/auth-service";
import { getStudentEnrollments } from "../services/study-service";
import { getAllPrograms } from "../data/programs";

// ─── Auth Form ───────────────────────────────────────────────────────────────

function AuthForm() {
  const { t } = useLanguage();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await loginUser({ email: form.email, password: form.password });
      } else {
        await registerUser({
          email: form.email,
          password: form.password,
          displayName: form.displayName,
        });
      }
    } catch (err) {
      setError(t(mode === "login" ? "auth.loginError" : "auth.registerError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {mode === "login" ? t("auth.loginTitle") : t("auth.registerTitle")}
        </h1>

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("auth.displayName")}
              </label>
              <input
                type="text"
                name="displayName"
                value={form.displayName}
                onChange={handle}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("auth.email")}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handle}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("auth.password")}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handle}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
          >
            {submitting
              ? t("auth.loading")
              : mode === "login"
              ? t("auth.login")
              : t("auth.register")}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === "login" ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
          <button
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          >
            {mode === "login" ? t("auth.register") : t("auth.login")}
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ user, profile }) {
  const { t } = useLanguage();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const allPrograms = getAllPrograms();

  useEffect(() => {
    getStudentEnrollments(user.uid)
      .then(setEnrollments)
      .finally(() => setLoading(false));
  }, [user.uid]);

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("auth.myAccount")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            {profile?.displayName || user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          {t("auth.logout")}
        </button>
      </div>

      {/* Mentor badge */}
      {(profile?.role === "mentor" || profile?.role === "admin") && (
        <Link
          to="/mentor/"
          className="block mb-3 p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-xl text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          👩‍🏫 {t("studies.myStudents")} →
        </Link>
      )}
      {profile?.role === "admin" && (
        <Link
          to="/admin/"
          className="block mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          ⚙️ Panel de Administración →
        </Link>
      )}

      {/* My programs */}
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {t("studies.myPrograms")}
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t("studies.noPrograms")}</p>
          <Link
            to="/estudios/"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            {t("studies.browsePrograms")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enr) => {
            const program = allPrograms.find((p) => p.id === enr.programId);
            if (!program) return null;
            const isComplete = enr.status === "completed";
            return (
              <div
                key={enr.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                      {t(program.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {t(`studies.type_${program.type}`)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <ProgressBar percent={enr.percentComplete} />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {enr.percentComplete}%
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/estudios/${program.id}/`}
                    className={`shrink-0 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                      isComplete
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isComplete ? t("studies.completed") : t("studies.continue")}
                  </Link>
                </div>
              </div>
            );
          })}

          <div className="text-center pt-2">
            <Link
              to="/estudios/"
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              {t("studies.browsePrograms")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MiCuentaPage() {
  const { user, profile, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? (
    <Dashboard user={user} profile={profile} />
  ) : (
    <AuthForm />
  );
}

export function Head() {
  return <title>Mi Cuenta | Voces de Esperanza</title>;
}
