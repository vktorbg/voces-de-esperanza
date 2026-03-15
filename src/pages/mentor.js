import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import AuthGuard from "../components/AuthGuard";
import { useAuth } from "../components/AuthProvider";
import { useLanguage } from "../components/LanguageProvider";
import { getMentorStudents, getStudentEnrollments } from "../services/study-service";
import { getAllPrograms } from "../data/programs";
import ProgressBar from "../components/studies/ProgressBar";

function MentorDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const programs = getAllPrograms();

  const [students, setStudents] = useState([]);
  const [studentEnrollments, setStudentEnrollments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getMentorStudents(user.uid).then(async (studs) => {
      setStudents(studs);
      // Load enrollments for each student
      const map = {};
      await Promise.all(
        studs.map(async (s) => {
          const enrollments = await getStudentEnrollments(s.uid);
          map[s.uid] = enrollments;
        })
      );
      setStudentEnrollments(map);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        👩‍🏫 {t("studies.myStudents")}
      </h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p>{t("studies.noStudents")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map((student) => {
            const enrollments = studentEnrollments[student.uid] || [];
            return (
              <div
                key={student.uid}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {student.displayName}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{student.email}</p>
                  </div>
                  <Link
                    to={`/mentor/${student.uid}/`}
                    className="text-sm px-4 py-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                  >
                    {t("studies.viewResponses")}
                  </Link>
                </div>

                {enrollments.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {enrollments.map((enr) => {
                      const program = programs.find((p) => p.id === enr.programId);
                      if (!program) return null;
                      return (
                        <div key={enr.id} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400 w-28 truncate shrink-0">
                            {t(program.titleKey)}
                          </span>
                          <ProgressBar percent={enr.percentComplete} size="sm" className="flex-1" />
                          <span className="text-xs text-gray-400 w-8 text-right shrink-0">
                            {enr.percentComplete}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MentorPage() {
  return (
    <AuthGuard role="mentor">
      <MentorDashboard />
    </AuthGuard>
  );
}

export function Head() {
  return <title>Panel Mentor | Voces de Esperanza</title>;
}
