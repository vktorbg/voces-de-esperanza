/**
 * Valida que un programa de estudio siga el Patrón B (i18n-first).
 * Úsalo durante el desarrollo para detectar texto hardcodeado.
 *
 * Ejemplo de uso:
 *   import miPrograma from "./mi-nuevo-estudio";
 *   import { validateProgram } from "./validate-program";
 *   const warnings = validateProgram(miPrograma);
 *   if (warnings.length) console.warn(warnings.join("\n"));
 */

/**
 * Valida la estructura i18n de un programa.
 * @param {object} program - El objeto del programa a validar
 * @returns {string[]} Array de advertencias. Vacío = estructura correcta.
 */
export function validateProgram(program) {
  const warnings = [];
  const id = program.id || "(sin id)";

  if (!program.titleKey) warnings.push(`[${id}] Falta titleKey en el programa`);
  if (!program.descriptionKey) warnings.push(`[${id}] Falta descriptionKey en el programa`);

  program.modules?.forEach((mod) => {
    const modId = mod.id || "(sin id)";

    if (!mod.titleKey) warnings.push(`[${id} > ${modId}] Falta titleKey en el módulo`);

    mod.lessons?.forEach((lesson) => {
      const lesId = lesson.id || "(sin id)";
      const path = `${id} > ${modId} > ${lesId}`;

      if (!lesson.titleKey) warnings.push(`[${path}] Falta titleKey en la lección`);

      // affirmation/prayer deben usar claves
      if (lesson.affirmation && !lesson.affirmationKey) {
        warnings.push(`[${path}] affirmation hardcodeada, usa affirmationKey`);
      }
      if (lesson.prayer && !lesson.prayerKey) {
        warnings.push(`[${path}] prayer hardcodeada, usa prayerKey`);
      }

      lesson.contentBlocks?.forEach((block, i) => {
        const blockPath = `${path} > block[${i}]`;

        if (block.type === "verse") {
          if (block.text && !block.textKey) {
            warnings.push(`[${blockPath}] verse con text hardcodeado, usa textKey`);
          }
          if (!block.textKey) {
            warnings.push(`[${blockPath}] verse sin textKey`);
          }
          if (!block.referenceKey) {
            warnings.push(`[${blockPath}] verse sin referenceKey (la referencia no se localizará)`);
          }
        }

        if (block.type === "text") {
          if (block.text && !block.textKey) {
            warnings.push(`[${blockPath}] text hardcodeado, usa textKey`);
          }
          if (!block.textKey) {
            warnings.push(`[${blockPath}] text sin textKey`);
          }
        }
      });

      lesson.questions?.forEach((q) => {
        const qPath = `${path} > ${q.id || "pregunta"}`;

        if (q.prompt && !q.promptKey) {
          warnings.push(`[${qPath}] prompt hardcodeado, usa promptKey`);
        }
        if (!q.promptKey && q.type !== "multiple_choice") {
          warnings.push(`[${qPath}] pregunta sin promptKey`);
        }
      });
    });
  });

  return warnings;
}
