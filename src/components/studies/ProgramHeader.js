import React from "react";
import { Link } from "gatsby";
import { useLanguage } from "../LanguageProvider";
import ProgressBar from "./ProgressBar";
import { countTotalLessons } from "../../data/programs";

/**
 * ProgramHeader — displayed at the top of the program detail page.
 *
 * Props:
 *   program    — program data object
 *   enrollment — Firestore enrollment doc (or null)
 */
export default function ProgramHeader({ program, enrollment }) {
  const { t } = useLanguage();

  const percent = enrollment?.percentComplete ?? 0;
  const completedCount = enrollment?.completedLessons?.length ?? 0;
  const totalLessons = countTotalLessons(program);
  const isComplete = enrollment?.status === "completed";

  const duration = program.durationDays
    ? `${program.durationDays} ${t("studies.days")}`
    : program.durationWeeks
    ? `${program.durationWeeks} ${t("studies.weeks")}`
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
      {/* Back link */}
      <Link
        to="/estudios/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        {t("studies.catalog")}
      </Link>

      {/* Type badge */}
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 mb-3 inline-block">
        {t(`studies.type_${program.type}`)}
      </span>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-2 mb-1">
        {t(program.titleKey)}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        {t(program.descriptionKey)}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        {duration && (
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
            </svg>
            {duration}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
            <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
          </svg>
          {totalLessons} {t("studies.lessons")}
        </span>
      </div>

      {/* Progress bar (only if enrolled) */}
      {enrollment && (
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>{t("studies.progress")}</span>
            <span>
              {completedCount}/{totalLessons} {t("studies.lessons")}
            </span>
          </div>
          <ProgressBar percent={percent} showLabel size="md" />
          {isComplete && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium text-center">
              🎉 {t("studies.completed")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
