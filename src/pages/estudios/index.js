import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useAuth } from "../../components/AuthProvider";
import { useLanguage } from "../../components/LanguageProvider";
import ProgramCard from "../../components/studies/ProgramCard";
import { getAllPrograms } from "../../data/programs";
import { getStudentEnrollments } from "../../services/study-service";
import PageHeader from "../../components/PageHeader";

export default function EstudiosPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const programs = getAllPrograms();

  const [enrollmentMap, setEnrollmentMap] = useState({});
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingEnrollments(true);
    getStudentEnrollments(user.uid)
      .then((enrollments) => {
        const map = {};
        enrollments.forEach((e) => { map[e.programId] = e; });
        setEnrollmentMap(map);
      })
      .finally(() => setLoadingEnrollments(false));
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-8 pt-20">
      <PageHeader title={t("studies.catalog")} />
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 mt-2">
        {t("studies.catalogSubtitle")}
      </p>

      {!user && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-700 dark:text-blue-300">
          <Link to="/mi-cuenta/" className="font-semibold hover:underline">
            {t("auth.login")}
          </Link>{" "}
          {t("studies.enrollSuccess").includes("inscrit")
            ? "o regístrate para guardar tu progreso."
            : "or register to save your progress."}
        </div>
      )}

      {programs.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-14 h-14 mx-auto mb-4 opacity-40">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
          </svg>
          <p className="font-medium">{t("common.comingSoon")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              enrollment={enrollmentMap[program.id] || null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Head() {
  return <title>Estudios | Voces de Esperanza</title>;
}
