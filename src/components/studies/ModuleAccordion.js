import React, { useState } from "react";
import { Link } from "gatsby";
import { useLanguage } from "../LanguageProvider";

/**
 * ModuleAccordion — shows modules as collapsible sections.
 * Each lesson shows its completion state and links to the lesson page.
 *
 * Props:
 *   program      — program data object
 *   programId    — string id (same as program.id)
 *   completedLessons — array of lessonIds the student has completed
 *   isEnrolled   — boolean, whether the student is enrolled
 */
export default function ModuleAccordion({ program, programId, completedLessons = [], isEnrolled }) {
  const { t } = useLanguage();
  // Open first module by default
  const [openModules, setOpenModules] = useState(() => new Set([program.modules[0]?.id]));

  function toggle(moduleId) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  }

  // A lesson is locked if sequential mode is on AND the previous lesson isn't done yet.
  // For now we lock only if the student is NOT enrolled at all.
  function isLocked(lesson, lessonIndex, moduleIndex) {
    if (!isEnrolled) return true;
    if (lessonIndex === 0 && moduleIndex === 0) return false; // first lesson always unlocked
    return false; // allow free navigation once enrolled
  }

  return (
    <div className="space-y-3">
      {program.modules.map((mod, mi) => {
        const isOpen = openModules.has(mod.id);
        const moduleLessons = mod.lessons || [];
        const doneInModule = moduleLessons.filter((l) => completedLessons.includes(l.id)).length;
        const allDone = doneInModule === moduleLessons.length && moduleLessons.length > 0;

        return (
          <div
            key={mod.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm"
          >
            {/* Module header (clickable) */}
            <button
              onClick={() => toggle(mod.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Done indicator */}
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    allDone
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {allDone ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    mi + 1
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                    {t(mod.titleKey)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {doneInModule}/{moduleLessons.length} {t("studies.lessons")}
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 text-gray-400 shrink-0 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Lesson list */}
            {isOpen && (
              <ul className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                {moduleLessons.map((lesson, li) => {
                  const done = completedLessons.includes(lesson.id);
                  const locked = isLocked(lesson, li, mi);

                  const inner = (
                    <div className="flex items-center gap-3 px-5 py-3.5">
                      {/* Status icon */}
                      <span
                        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          done
                            ? "bg-green-500 text-white"
                            : locked
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400"
                            : "border-2 border-blue-400 text-blue-400"
                        }`}
                      >
                        {done ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        ) : locked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>

                      <span
                        className={`text-sm flex-1 ${
                          locked
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {t(lesson.titleKey)}
                      </span>

                      {!locked && !done && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  );

                  return (
                    <li key={lesson.id}>
                      {locked ? (
                        <div className="cursor-not-allowed opacity-60">{inner}</div>
                      ) : (
                        <Link
                          to={`/estudios/${programId}/${mod.id}/${lesson.id}/`}
                          className="block hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
