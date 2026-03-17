/**
 * PLANTILLA PARA NUEVOS PROGRAMAS DE ESTUDIO
 * ============================================
 *
 * Copia este archivo, renómbralo (ej: mi-nuevo-estudio.js) y
 * regístralo en src/data/programs/index.js.
 *
 * REGLA FUNDAMENTAL: Ningún texto visible al usuario puede estar
 * hardcodeado en este archivo. Todo debe usar claves i18n (*Key).
 *
 * PASOS PARA CREAR UN PROGRAMA NUEVO:
 * 1. Define la estructura aquí con claves i18n
 * 2. Añade todas las claves a src/locales/es/programs.json (español)
 * 3. Añade todas las claves a src/locales/en/programs.json (inglés)
 *    - Los versículos en inglés deben ser de la NLT u otra traducción pública
 * 4. Registra el programa en src/data/programs/index.js
 * 5. Ejecuta validateProgram(program) para verificar que no hay texto hardcodeado
 *
 * CONVENCIÓN DE CLAVES:
 * programs.<camelCaseId>.<modulo>.<leccion>.<campo>
 * Ejemplo: programs.miPrograma.mod1.les1.verse
 *
 * CAMPOS REQUERIDOS POR BLOQUE:
 * - verse:  reference, referenceKey, textKey
 * - text:   textKey  (+ style opcional: "highlight" | "summary")
 * - video:  youtubeId  (sin claves, el video es universal)
 *
 * CAMPOS REQUERIDOS POR PREGUNTA:
 * - reflection / application:  id, type, promptKey
 * - multiple_choice:  id, type, promptKey, options, correctOption
 *
 * CAMPOS REQUERIDOS POR LECCIÓN:
 * - titleKey, affirmationKey, prayerKey
 */

const program = {
  id: "mi-nuevo-estudio",               // kebab-case, único
  type: "short_study",                  // "short_study" | "multi_module" | "guided_course"
  durationDays: 7,                      // o durationWeeks para multi_module
  titleKey: "programs.miNuevoEstudio.title",
  descriptionKey: "programs.miNuevoEstudio.description",

  modules: [
    {
      id: "mod-1",
      titleKey: "programs.miNuevoEstudio.mod1.title",
      lessons: [
        {
          id: "les-1",
          titleKey: "programs.miNuevoEstudio.mod1.les1.title",
          contentBlocks: [
            // ── VERSÍCULO ──────────────────────────────────────────────
            // reference: referencia canónica en inglés (para el campo de búsqueda)
            // referenceKey: referencia localizada (ej. "Juan 3:16 (NVI)" en es,
            //               "John 3:16 (NLT)" en en)
            // textKey: texto del versículo (NBLA en es, NLT en en)
            {
              type: "verse",
              reference: "John 3:16",
              referenceKey: "programs.miNuevoEstudio.mod1.les1.reference",
              textKey: "programs.miNuevoEstudio.mod1.les1.verse",
            },

            // ── TEXTO DESTACADO (highlight) ────────────────────────────
            {
              type: "text",
              textKey: "programs.miNuevoEstudio.mod1.les1.text1",
              style: "highlight",  // frase corta destacada al inicio
            },

            // ── TEXTO NORMAL ───────────────────────────────────────────
            {
              type: "text",
              textKey: "programs.miNuevoEstudio.mod1.les1.text2",
            },

            // ── TEXTO RESUMEN (summary) ────────────────────────────────
            {
              type: "text",
              textKey: "programs.miNuevoEstudio.mod1.les1.text3",
              style: "summary",  // conclusión o punto clave al final
            },

            // ── VIDEO (opcional) ───────────────────────────────────────
            // { type: "video", youtubeId: "dQw4w9WgXcQ" },
          ],
          questions: [
            // ── REFLEXIÓN ─────────────────────────────────────────────
            {
              id: "les1-q1",
              type: "reflection",
              promptKey: "programs.miNuevoEstudio.mod1.les1.q1",
            },
            // ── APLICACIÓN (diario) ────────────────────────────────────
            {
              id: "les1-q2",
              type: "application",
              promptKey: "programs.miNuevoEstudio.mod1.les1.q2",
            },
            // ── OPCIÓN MÚLTIPLE (opcional) ─────────────────────────────
            // {
            //   id: "les1-q3",
            //   type: "multiple_choice",
            //   promptKey: "programs.miNuevoEstudio.mod1.les1.q3",
            //   options: [
            //     { key: "a", label: "Opción A" },
            //     { key: "b", label: "Opción B" },
            //   ],
            //   correctOption: "a",
            // },
          ],
          affirmationKey: "programs.miNuevoEstudio.mod1.les1.affirmation",
          prayerKey: "programs.miNuevoEstudio.mod1.les1.prayer",
        },
        // ... más lecciones
      ],
    },
    // ... más módulos
  ],
};

export default program;
