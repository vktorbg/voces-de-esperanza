import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useAuth } from "../../../components/AuthProvider";
import { useLanguage } from "../../../components/LanguageProvider";
import ProgramHeader from "../../../components/studies/ProgramHeader";
import ModuleAccordion from "../../../components/studies/ModuleAccordion";
import { getProgramById, countTotalLessons } from "../../../data/programs";
import { getEnrollment, enrollInProgram } from "../../../services/study-service";

export default function ProgramPage({ params }) {
  const { programId } = params;
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();

  const program = getProgramById(programId);

  const [enrollment, setEnrollment] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setEnrollLoading(false); return; }
    getEnrollment(user.uid, programId)
      .then(setEnrollment)
      .finally(() => setEnrollLoading(false));
  }, [user, authLoading, programId]);

  if (!program) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">{t("common.noContent")}</p>
      </div>
    );
  }

  async function handleEnroll() {
    if (!user) { navigate("/mi-cuenta/"); return; }
    setEnrolling(true);
    setEnrollError("");
    try {
      await enrollInProgram(user.uid, programId);
      const updated = await getEnrollment(user.uid, programId);
      setEnrollment(updated);
      setToast(t("studies.enrollSuccess"));
      setTimeout(() => setToast(""), 3000);
    } catch {
      setEnrollError(t("studies.enrollError"));
    } finally {
      setEnrolling(false);
    }
  }

  const isEnrolled = !!enrollment;
  const completedLessons = enrollment?.completedLessons || [];
  const firstModule = program.modules[0];
  const firstLesson = firstModule?.lessons[0];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-10">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <ProgramHeader program={program} enrollment={enrollment} />

      {/* Enroll / Continue CTA */}
      {!enrollLoading && (
        <div className="mb-6">
          {!isEnrolled ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 text-center">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                {user
                  ? t("studies.catalogSubtitle")
                  : t("auth.noAccount")}
              </p>
              {enrollError && <p className="text-red-500 text-sm mb-3">{enrollError}</p>}
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
              >
                {enrolling ? t("auth.loading") : user ? t("studies.enroll") : t("auth.login")}
              </button>
            </div>
          ) : firstLesson ? (
            <button
              onClick={() =>
                navigate(`/estudios/${programId}/${firstModule.id}/${firstLesson.id}/`)
              }
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              {enrollment?.percentComplete > 0
                ? t("studies.continue")
                : t("studies.startStudy")}
            </button>
          ) : null}
        </div>
      )}

      {/* Module accordion */}
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
        {t("studies.lessons")}
      </h2>
      <ModuleAccordion
        program={program}
        programId={programId}
        completedLessons={completedLessons}
        isEnrolled={isEnrolled}
      />
    </div>
  );
}

export function Head() {
  return <title>Estudio | Voces de Esperanza</title>;
}
