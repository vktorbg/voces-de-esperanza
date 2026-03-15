/**
 * Central registry of all study programs.
 * Import each program file and add it to the array.
 * The UI uses this list for the catalog, dashboard, and nav.
 */

import libertadEmocional from "./libertad-emocional";
import consejeriaMatrimonial from "./consejeria-matrimonial";
import guiaDecisionMatrimonio from "./guia-decision-matrimonio";
import manualEstudiante from "./manual-estudiante";

const programs = [
  libertadEmocional,
  consejeriaMatrimonial,
  guiaDecisionMatrimonio,
  manualEstudiante,
];

export default programs;

/**
 * Returns all registered programs.
 */
export function getAllPrograms() {
  return programs;
}

/**
 * Find a program by its id string.
 */
export function getProgramById(id) {
  return programs.find((p) => p.id === id) || null;
}

/**
 * Count total lessons across all modules of a program.
 */
export function countTotalLessons(program) {
  return program.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}

/**
 * Find a specific lesson inside a program by moduleId + lessonId.
 */
export function findLesson(program, moduleId, lessonId) {
  const mod = program.modules.find((m) => m.id === moduleId);
  if (!mod) return null;
  return mod.lessons.find((l) => l.id === lessonId) || null;
}

/**
 * Get the next lesson after the given one (for "Next lesson" button).
 * Returns null if it's the last lesson of the program.
 */
export function getNextLesson(program, moduleId, lessonId) {
  for (let mi = 0; mi < program.modules.length; mi++) {
    const mod = program.modules[mi];
    if (mod.id !== moduleId) continue;
    const li = mod.lessons.findIndex((l) => l.id === lessonId);
    if (li === -1) return null;
    // Next lesson in same module
    if (li + 1 < mod.lessons.length) {
      return { moduleId: mod.id, lesson: mod.lessons[li + 1] };
    }
    // First lesson of next module
    if (mi + 1 < program.modules.length) {
      const nextMod = program.modules[mi + 1];
      return { moduleId: nextMod.id, lesson: nextMod.lessons[0] };
    }
    return null; // last lesson of program
  }
  return null;
}
