import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import AuthGuard from "../components/AuthGuard";
import { useAuth } from "../components/AuthProvider";
import { useLanguage } from "../components/LanguageProvider";
import { getUserProfile } from "../services/auth-service";
import { getProgramResponses, saveMentorFeedback, getStudentEnrollments } from "../services/study-service";
import { getProgramById } from "../data/programs";

// ─── Feedback card for a single response ─────────────────────────────────────

function FeedbackCard({ response, program, t }) {
  const [feedback, setFeedback] = useState(response.mentorFeedback?.text || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!response.mentorFeedback?.text);

  async function handleSave() {
    if (!feedback.trim()) return;
    setSaving(true);
    await saveMentorFeedback(response.id, feedback);
    setSaved(true);
    setSaving(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
      {/* Question context */}
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
          {t("studies.lesson")}: {response.lessonId} · {t("studies.question")}: {response.questionId}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(response.savedAt?.seconds * 1000).toLocaleDateString()}
        </p>
      </div>

      {/* Student answer */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 mb-4">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
          {t("studies.yourAnswer")}:
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {Array.isArray(response.answer) ? response.answer.join(", ") : response.answer}
        </p>
      </div>

      {/* Mentor feedback */}
      <div>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          👩‍🏫 {t("studies.mentorFeedback")}
        </p>
        <textarea
          value={feedback}
          onChange={(e) => { setFeedback(e.target.value); setSaved(false); }}
          placeholder={t("studies.writeFeedback")}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">
            {saved ? `✓ ${t("studies.feedbackSaved")}` : ""}
          </span>
          <button
            onClick={handleSave}
            disabled={saving || !feedback.trim()}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {saving ? t("auth.loading") : t("studies.saveFeedback")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function MentorStudentContent({ params }) {
  const { studentId } = params;
  const { t } = useLanguage();
  const { user } = useAuth();

  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    Promise.all([
      getUserProfile(studentId),
      getStudentEnrollments(studentId),
    ]).then(([prof, enrs]) => {
      setStudent(prof);
      setEnrollments(enrs);
      if (enrs.length > 0) setSelectedProgram(enrs[0].programId);
      setLoading(false);
    });
  }, [studentId]);

  useEffect(() => {
    if (!selectedProgram) return;
    getProgramResponses(studentId, selectedProgram).then((res) => {
      // Sort by savedAt desc
      setResponses(res.sort((a, b) => (b.savedAt?.seconds || 0) - (a.savedAt?.seconds || 0)));
    });
  }, [selectedProgram, studentId]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back */}
      <Link
        to="/mentor/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        {t("studies.myStudents")}
      </Link>

      {/* Student info */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {student?.displayName}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{student?.email}</p>
      </div>

      {/* Program selector */}
      {enrollments.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {enrollments.map((enr) => {
            const program = getProgramById(enr.programId);
            return (
              <button
                key={enr.programId}
                onClick={() => setSelectedProgram(enr.programId)}
                className={`shrink-0 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  selectedProgram === enr.programId
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {program ? t(program.titleKey) : enr.programId}
              </button>
            );
          })}
        </div>
      )}

      {/* Responses */}
      {responses.length === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-500 py-10">
          {t("common.noContent")}
        </p>
      ) : (
        <div className="space-y-4">
          {responses.map((resp) => (
            <FeedbackCard
              key={resp.id}
              response={resp}
              program={selectedProgram ? getProgramById(selectedProgram) : null}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MentorStudentPage({ params }) {
  return (
    <AuthGuard role="mentor">
      <MentorStudentContent params={params} />
    </AuthGuard>
  );
}

export function Head() {
  return <title>Estudiante | Panel Mentor</title>;
}
