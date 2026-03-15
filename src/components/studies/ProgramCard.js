import React from "react";
import { Link } from "gatsby";
import { useLanguage } from "../LanguageProvider";
import ProgressBar from "./ProgressBar";

// Type badge colors
const TYPE_COLORS = {
  short_study:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  multi_module:  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  guided_course: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

/**
 * ProgramCard — shown in the /estudios/ catalog.
 *
 * Props:
 *   program   — program data object
 *   enrollment — Firestore enrollment doc (or null if not enrolled)
 */
export default function ProgramCard({ program, enrollment }) {
  const { t } = useLanguage();

  const isEnrolled = !!enrollment;
  const percent = enrollment?.percentComplete ?? 0;
  const isComplete = enrollment?.status === "completed";

  const duration = program.durationDays
    ? `${program.durationDays} ${t("studies.days")}`
    : program.durationWeeks
    ? `${program.durationWeeks} ${t("studies.weeks")}`
    : null;

  return (
    <Link
      to={`/estudios/${program.id}/`}
      className="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      {/* Color bar at top based on type */}
      <div
        className={`h-1.5 w-full ${
          program.type === "short_study"
            ? "bg-emerald-400"
            : program.type === "multi_module"
            ? "bg-blue-500"
            : "bg-indigo-500"
        }`}
      />

      <div className="p-5">
        {/* Type badge + duration */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[program.type] || TYPE_COLORS.short_study}`}>
            {t(`studies.type_${program.type}`)}
          </span>
          {duration && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {t("studies.duration")}: {duration}
            </span>
          )}
        </div>

        {/* Title & description */}
        <h3 className="font-bold text-gray-800 dark:text-white text-base leading-snug mb-1">
          {t(program.titleKey)}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {t(program.descriptionKey)}
        </p>

        {/* Progress (only if enrolled) */}
        {isEnrolled && (
          <div className="mt-4">
            <ProgressBar percent={percent} showLabel size="sm" />
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {program.modules?.length
              ? `${program.modules.length} ${t("studies.module")}${program.modules.length !== 1 ? "s" : ""}`
              : ""}
          </span>
          <span
            className={`text-sm font-semibold px-4 py-1.5 rounded-xl transition-colors ${
              isComplete
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : isEnrolled
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {isComplete
              ? t("studies.completed")
              : isEnrolled
              ? t("studies.continue")
              : t("studies.startStudy")}
          </span>
        </div>
      </div>
    </Link>
  );
}
