import React, { useEffect, useState, useCallback } from "react";
import { Link, navigate } from "gatsby";
import { useAuth } from "../components/AuthProvider";
import { useLanguage } from "../components/LanguageProvider";
import AuthGuard from "../components/AuthGuard";
import ProgressBar from "../components/studies/ProgressBar";
import {
  getProgramById,
  findLesson,
  getNextLesson,
  countTotalLessons,
} from "../data/programs";
import {
  getLessonResponses,
  saveResponse,
  markLessonComplete,
  getEnrollment,
} from "../services/study-service";

// ─── Content block renderers ──────────────────────────────────────────────────

function VerseBlock({ block, t }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-xl px-5 py-4 my-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400 mb-1">
        {t("studies.verse")} — {block.reference}
      </p>
      <p className="text-gray-800 dark:text-gray-100 italic leading-relaxed">
        {block.text || ""}
      </p>
    </div>
  );
}

function TextBlock({ block }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none my-4 text-gray-700 dark:text-gray-300 leading-relaxed">
      <p>{block.text}</p>
    </div>
  );
}

function VideoBlock({ block }) {
  return (
    <div className="aspect-video rounded-xl overflow-hidden my-4 shadow">
      <iframe
        src={`https://www.youtube.com/embed/${block.youtubeId}`}
        title={block.title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

// ─── Question blocks ──────────────────────────────────────────────────────────

function ReflectionQuestion({ question, savedAnswer, onSave, t }) {
  const [value, setValue] = useState(savedAnswer || "");
  const [saved, setSaved] = useState(!!savedAnswer);
  const [saving, setSaving] = useState(false);

  // Debounced auto-save
  useEffect(() => {
    if (!value || value === savedAnswer) return;
    setSaved(false);
    const timer = setTimeout(async () => {
      setSaving(true);
      await onSave(question.id, value);
      setSaved(true);
      setSaving(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="my-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
      <p className="font-semibold text-gray-800 dark:text-white mb-3 leading-snug">
        {t("studies.question")}: {question.prompt}
      </p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("studies.writeAnswer")}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {saving ? t("auth.loading") : saved ? `✓ ${t("studies.answerSaved")}` : ""}
        </span>
      </div>

      {/* Mentor feedback */}
      {question._mentorFeedback && (
        <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-4">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            👩‍🏫 {t("studies.mentorFeedback")}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{question._mentorFeedback.text}</p>
        </div>
      )}
    </div>
  );
}

function MultipleChoiceQuestion({ question, savedAnswer, onSave, t }) {
  const [selected, setSelected] = useState(savedAnswer || null);
  const [submitted, setSubmitted] = useState(!!savedAnswer);

  async function choose(key) {
    if (submitted) return;
    setSelected(key);
    setSubmitted(true);
    await onSave(question.id, key);
  }

  return (
    <div className="my-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
      <p className="font-semibold text-gray-800 dark:text-white mb-4 leading-snug">
        {t("studies.question")}: {question.prompt}
      </p>
      <div className="space-y-2">
        {question.options.map((opt) => {
          const isSelected = selected === opt.key;
          const isCorrect = opt.key === question.correctOption;
          let style = "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
          if (submitted && isSelected) {
            style = isCorrect
              ? "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
              : "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
          } else if (submitted && isCorrect) {
            style = "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
          }

          return (
            <button
              key={opt.key}
              onClick={() => choose(opt.key)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${style} disabled:cursor-default`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {submitted && (
        <p className={`mt-3 text-sm font-medium ${selected === question.correctOption ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
          {selected === question.correctOption ? t("studies.correctAnswer") : t("studies.wrongAnswer")}
        </p>
      )}
    </div>
  );
}

// ─── Main LessonPage ──────────────────────────────────────────────────────────

function LessonContent({ params }) {
  const { programId, moduleId, lessonId } = params;
  const { t } = useLanguage();
  const { user } = useAuth();

  const program = getProgramById(programId);
  const lesson = program ? findLesson(program, moduleId, lessonId) : null;
  const nextLesson = program ? getNextLesson(program, moduleId, lessonId) : null;
  const totalLessons = program ? countTotalLessons(program) : 0;

  const [responses, setResponses] = useState({});
  const [enrollment, setEnrollment] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!user || !program) return;
    getLessonResponses(user.uid, programId, lessonId).then(setResponses);
    getEnrollment(user.uid, programId).then((enr) => {
      setEnrollment(enr);
      setIsCompleted(enr?.completedLessons?.includes(lessonId) || false);
    });
  }, [user, programId, lessonId]);

  const handleSave = useCallback(
    async (questionId, answer) => {
      if (!user) return;
      await saveResponse(user.uid, programId, lessonId, questionId, answer);
      setResponses((prev) => ({
        ...prev,
        [questionId]: { ...prev[questionId], answer },
      }));
    },
    [user, programId, lessonId]
  );

  async function handleComplete() {
    if (!user || isCompleted) return;
    setCompleting(true);
    try {
      await markLessonComplete(user.uid, programId, lessonId, totalLessons);
      setIsCompleted(true);
      setToast(t("studies.markComplete") + " ✓");
      setTimeout(() => {
        setToast("");
        if (nextLesson) {
          navigate(`/estudios/${programId}/${nextLesson.moduleId}/${nextLesson.lesson.id}/`);
        } else {
          navigate(`/estudios/${programId}/`);
        }
      }, 1500);
    } finally {
      setCompleting(false);
    }
  }

  if (!program || !lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">{t("common.noContent")}</p>
        <Link to="/estudios/" className="text-blue-600 mt-4 inline-block hover:underline">
          {t("studies.catalog")}
        </Link>
      </div>
    );
  }

  const completedCount = enrollment?.completedLessons?.length || 0;
  const percent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Top nav */}
      <div className="flex items-center justify-between py-4 mb-2">
        <Link
          to={`/estudios/${programId}/`}
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          {t("studies.backToProgram")}
        </Link>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {completedCount}/{totalLessons}
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar percent={percent} size="sm" className="mb-6" />

      {/* Lesson title */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        {t(lesson.titleKey)}
      </h1>

      {/* Content blocks */}
      {lesson.contentBlocks?.map((block, i) => {
        if (block.type === "verse") return <VerseBlock key={i} block={block} t={t} />;
        if (block.type === "text") return <TextBlock key={i} block={block} />;
        if (block.type === "video") return <VideoBlock key={i} block={block} />;
        return null;
      })}

      {/* Questions */}
      {lesson.questions?.map((q) => {
        const saved = responses[q.id];
        const qWithFeedback = { ...q, _mentorFeedback: saved?.mentorFeedback };
        if (q.type === "reflection" || q.type === "application") {
          return (
            <ReflectionQuestion
              key={q.id}
              question={qWithFeedback}
              savedAnswer={saved?.answer}
              onSave={handleSave}
              t={t}
            />
          );
        }
        if (q.type === "multiple_choice") {
          return (
            <MultipleChoiceQuestion
              key={q.id}
              question={qWithFeedback}
              savedAnswer={saved?.answer}
              onSave={handleSave}
              t={t}
            />
          );
        }
        return null;
      })}

      {/* Complete / Next button */}
      <div className="mt-8 flex flex-col gap-3">
        {!isCompleted ? (
          <button
            onClick={handleComplete}
            disabled={completing}
            className="w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
          >
            {completing ? t("auth.loading") : t("studies.markComplete")}
          </button>
        ) : nextLesson ? (
          <Link
            to={`/estudios/${programId}/${nextLesson.moduleId}/${nextLesson.lesson.id}/`}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-center"
          >
            {t("studies.nextLesson")} →
          </Link>
        ) : (
          <Link
            to={`/estudios/${programId}/`}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-center"
          >
            {t("studies.backToProgram")}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function LessonPage({ params }) {
  return (
    <AuthGuard>
      <LessonContent params={params} />
    </AuthGuard>
  );
}

export function Head() {
  return <title>Lección | Voces de Esperanza</title>;
}
