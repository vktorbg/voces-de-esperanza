/**
 * Estudio: Libertad Emocional
 * 4 semanas / 20 días
 * Fuente: Estudio-Libertad-Emocional.pdf
 *
 * Todos los textos usan claves i18n (Patrón B).
 * Traducciones en: src/locales/es/programs.json y src/locales/en/programs.json
 */

const program = {
  id: "libertad-emocional",
  type: "multi_module",
  durationWeeks: 4,
  titleKey: "programs.libertadEmocional.title",
  descriptionKey: "programs.libertadEmocional.description",

  modules: [
    // ─── SEMANA 1 ────────────────────────────────────────────────────────────
    {
      id: "semana-1",
      titleKey: "programs.libertadEmocional.s1.title",
      lessons: [
        {
          id: "dia-1",
          titleKey: "programs.libertadEmocional.s1.d1.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Proverbs 4:23",
              referenceKey: "programs.libertadEmocional.s1.d1.reference",
              textKey: "programs.libertadEmocional.s1.d1.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s1.d1.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d1.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d1.text3", style: "summary" },
          ],
          questions: [
            { id: "s1d1-q1", type: "reflection", promptKey: "programs.libertadEmocional.s1.d1.q1" },
            { id: "s1d1-q2", type: "reflection", promptKey: "programs.libertadEmocional.s1.d1.q2" },
            { id: "s1d1-journal", type: "application", promptKey: "programs.libertadEmocional.s1.d1.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s1.d1.affirmation",
          prayerKey: "programs.libertadEmocional.s1.d1.prayer",
        },
        {
          id: "dia-2",
          titleKey: "programs.libertadEmocional.s1.d2.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Matthew 15:19",
              referenceKey: "programs.libertadEmocional.s1.d2.reference",
              textKey: "programs.libertadEmocional.s1.d2.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s1.d2.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d2.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d2.text3", style: "summary" },
          ],
          questions: [
            { id: "s1d2-q1", type: "reflection", promptKey: "programs.libertadEmocional.s1.d2.q1" },
            { id: "s1d2-q2", type: "reflection", promptKey: "programs.libertadEmocional.s1.d2.q2" },
            { id: "s1d2-journal", type: "application", promptKey: "programs.libertadEmocional.s1.d2.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s1.d2.affirmation",
          prayerKey: "programs.libertadEmocional.s1.d2.prayer",
        },
        {
          id: "dia-3",
          titleKey: "programs.libertadEmocional.s1.d3.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Proverbs 23:7",
              referenceKey: "programs.libertadEmocional.s1.d3.reference",
              textKey: "programs.libertadEmocional.s1.d3.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s1.d3.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d3.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d3.text3", style: "summary" },
          ],
          questions: [
            { id: "s1d3-q1", type: "reflection", promptKey: "programs.libertadEmocional.s1.d3.q1" },
            { id: "s1d3-q2", type: "reflection", promptKey: "programs.libertadEmocional.s1.d3.q2" },
            { id: "s1d3-journal", type: "application", promptKey: "programs.libertadEmocional.s1.d3.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s1.d3.affirmation",
          prayerKey: "programs.libertadEmocional.s1.d3.prayer",
        },
        {
          id: "dia-4",
          titleKey: "programs.libertadEmocional.s1.d4.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "1 John 1:9",
              referenceKey: "programs.libertadEmocional.s1.d4.reference",
              textKey: "programs.libertadEmocional.s1.d4.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s1.d4.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d4.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d4.text3", style: "summary" },
          ],
          questions: [
            { id: "s1d4-q1", type: "reflection", promptKey: "programs.libertadEmocional.s1.d4.q1" },
            { id: "s1d4-q2", type: "reflection", promptKey: "programs.libertadEmocional.s1.d4.q2" },
            { id: "s1d4-journal", type: "application", promptKey: "programs.libertadEmocional.s1.d4.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s1.d4.affirmation",
          prayerKey: "programs.libertadEmocional.s1.d4.prayer",
        },
        {
          id: "dia-5",
          titleKey: "programs.libertadEmocional.s1.d5.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Revelation 12:11",
              referenceKey: "programs.libertadEmocional.s1.d5.reference",
              textKey: "programs.libertadEmocional.s1.d5.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s1.d5.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d5.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s1.d5.text3", style: "summary" },
          ],
          questions: [
            { id: "s1d5-q1", type: "reflection", promptKey: "programs.libertadEmocional.s1.d5.q1" },
            { id: "s1d5-q2", type: "reflection", promptKey: "programs.libertadEmocional.s1.d5.q2" },
            { id: "s1d5-journal", type: "application", promptKey: "programs.libertadEmocional.s1.d5.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s1.d5.affirmation",
          prayerKey: "programs.libertadEmocional.s1.d5.prayer",
        },
      ],
    },

    // ─── SEMANA 2 ────────────────────────────────────────────────────────────
    {
      id: "semana-2",
      titleKey: "programs.libertadEmocional.s2.title",
      lessons: [
        {
          id: "dia-6",
          titleKey: "programs.libertadEmocional.s2.d6.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "John 8:32",
              referenceKey: "programs.libertadEmocional.s2.d6.reference",
              textKey: "programs.libertadEmocional.s2.d6.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s2.d6.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d6.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d6.text3", style: "summary" },
          ],
          questions: [
            { id: "s2d6-q1", type: "reflection", promptKey: "programs.libertadEmocional.s2.d6.q1" },
            { id: "s2d6-q2", type: "reflection", promptKey: "programs.libertadEmocional.s2.d6.q2" },
            { id: "s2d6-journal", type: "application", promptKey: "programs.libertadEmocional.s2.d6.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s2.d6.affirmation",
          prayerKey: "programs.libertadEmocional.s2.d6.prayer",
        },
        {
          id: "dia-7",
          titleKey: "programs.libertadEmocional.s2.d7.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Psalm 34:18",
              referenceKey: "programs.libertadEmocional.s2.d7.reference",
              textKey: "programs.libertadEmocional.s2.d7.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s2.d7.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d7.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d7.text3", style: "summary" },
          ],
          questions: [
            { id: "s2d7-q1", type: "reflection", promptKey: "programs.libertadEmocional.s2.d7.q1" },
            { id: "s2d7-q2", type: "reflection", promptKey: "programs.libertadEmocional.s2.d7.q2" },
            { id: "s2d7-journal", type: "application", promptKey: "programs.libertadEmocional.s2.d7.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s2.d7.affirmation",
          prayerKey: "programs.libertadEmocional.s2.d7.prayer",
        },
        {
          id: "dia-8",
          titleKey: "programs.libertadEmocional.s2.d8.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Luke 23:34",
              referenceKey: "programs.libertadEmocional.s2.d8.reference",
              textKey: "programs.libertadEmocional.s2.d8.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s2.d8.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d8.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d8.text3", style: "summary" },
          ],
          questions: [
            { id: "s2d8-q1", type: "reflection", promptKey: "programs.libertadEmocional.s2.d8.q1" },
            { id: "s2d8-q2", type: "reflection", promptKey: "programs.libertadEmocional.s2.d8.q2" },
            { id: "s2d8-journal", type: "application", promptKey: "programs.libertadEmocional.s2.d8.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s2.d8.affirmation",
          prayerKey: "programs.libertadEmocional.s2.d8.prayer",
        },
        {
          id: "dia-9",
          titleKey: "programs.libertadEmocional.s2.d9.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Romans 12:19",
              referenceKey: "programs.libertadEmocional.s2.d9.reference",
              textKey: "programs.libertadEmocional.s2.d9.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s2.d9.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d9.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d9.text3", style: "summary" },
          ],
          questions: [
            { id: "s2d9-q1", type: "reflection", promptKey: "programs.libertadEmocional.s2.d9.q1" },
            { id: "s2d9-q2", type: "reflection", promptKey: "programs.libertadEmocional.s2.d9.q2" },
            { id: "s2d9-journal", type: "application", promptKey: "programs.libertadEmocional.s2.d9.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s2.d9.affirmation",
          prayerKey: "programs.libertadEmocional.s2.d9.prayer",
        },
        {
          id: "dia-10",
          titleKey: "programs.libertadEmocional.s2.d10.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Philippians 3:13",
              referenceKey: "programs.libertadEmocional.s2.d10.reference",
              textKey: "programs.libertadEmocional.s2.d10.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s2.d10.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d10.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s2.d10.text3", style: "summary" },
          ],
          questions: [
            { id: "s2d10-q1", type: "reflection", promptKey: "programs.libertadEmocional.s2.d10.q1" },
            { id: "s2d10-q2", type: "reflection", promptKey: "programs.libertadEmocional.s2.d10.q2" },
            { id: "s2d10-journal", type: "application", promptKey: "programs.libertadEmocional.s2.d10.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s2.d10.affirmation",
          prayerKey: "programs.libertadEmocional.s2.d10.prayer",
        },
      ],
    },

    // ─── SEMANA 3 ────────────────────────────────────────────────────────────
    {
      id: "semana-3",
      titleKey: "programs.libertadEmocional.s3.title",
      lessons: [
        {
          id: "dia-11",
          titleKey: "programs.libertadEmocional.s3.d11.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "John 8:44",
              referenceKey: "programs.libertadEmocional.s3.d11.reference",
              textKey: "programs.libertadEmocional.s3.d11.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s3.d11.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d11.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d11.text3", style: "summary" },
          ],
          questions: [
            { id: "s3d11-q1", type: "reflection", promptKey: "programs.libertadEmocional.s3.d11.q1" },
            { id: "s3d11-q2", type: "reflection", promptKey: "programs.libertadEmocional.s3.d11.q2" },
            { id: "s3d11-journal", type: "application", promptKey: "programs.libertadEmocional.s3.d11.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s3.d11.affirmation",
          prayerKey: "programs.libertadEmocional.s3.d11.prayer",
        },
        {
          id: "dia-12",
          titleKey: "programs.libertadEmocional.s3.d12.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Ephesians 4:27",
              referenceKey: "programs.libertadEmocional.s3.d12.reference",
              textKey: "programs.libertadEmocional.s3.d12.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s3.d12.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d12.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d12.text3", style: "summary" },
          ],
          questions: [
            { id: "s3d12-q1", type: "reflection", promptKey: "programs.libertadEmocional.s3.d12.q1" },
            { id: "s3d12-q2", type: "reflection", promptKey: "programs.libertadEmocional.s3.d12.q2" },
            { id: "s3d12-journal", type: "application", promptKey: "programs.libertadEmocional.s3.d12.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s3.d12.affirmation",
          prayerKey: "programs.libertadEmocional.s3.d12.prayer",
        },
        {
          id: "dia-13",
          titleKey: "programs.libertadEmocional.s3.d13.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Romans 12:2",
              referenceKey: "programs.libertadEmocional.s3.d13.reference",
              textKey: "programs.libertadEmocional.s3.d13.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s3.d13.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d13.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d13.text3", style: "summary" },
          ],
          questions: [
            { id: "s3d13-q1", type: "reflection", promptKey: "programs.libertadEmocional.s3.d13.q1" },
            { id: "s3d13-q2", type: "reflection", promptKey: "programs.libertadEmocional.s3.d13.q2" },
            { id: "s3d13-journal", type: "application", promptKey: "programs.libertadEmocional.s3.d13.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s3.d13.affirmation",
          prayerKey: "programs.libertadEmocional.s3.d13.prayer",
        },
        {
          id: "dia-14",
          titleKey: "programs.libertadEmocional.s3.d14.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "1 John 1:9",
              referenceKey: "programs.libertadEmocional.s3.d14.reference",
              textKey: "programs.libertadEmocional.s3.d14.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s3.d14.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d14.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d14.text3", style: "summary" },
          ],
          questions: [
            { id: "s3d14-q1", type: "reflection", promptKey: "programs.libertadEmocional.s3.d14.q1" },
            { id: "s3d14-q2", type: "reflection", promptKey: "programs.libertadEmocional.s3.d14.q2" },
            { id: "s3d14-journal", type: "application", promptKey: "programs.libertadEmocional.s3.d14.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s3.d14.affirmation",
          prayerKey: "programs.libertadEmocional.s3.d14.prayer",
        },
        {
          id: "dia-15",
          titleKey: "programs.libertadEmocional.s3.d15.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "John 10:10",
              referenceKey: "programs.libertadEmocional.s3.d15.reference",
              textKey: "programs.libertadEmocional.s3.d15.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s3.d15.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d15.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s3.d15.text3", style: "summary" },
          ],
          questions: [
            { id: "s3d15-q1", type: "reflection", promptKey: "programs.libertadEmocional.s3.d15.q1" },
            { id: "s3d15-q2", type: "reflection", promptKey: "programs.libertadEmocional.s3.d15.q2" },
            { id: "s3d15-journal", type: "application", promptKey: "programs.libertadEmocional.s3.d15.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s3.d15.affirmation",
          prayerKey: "programs.libertadEmocional.s3.d15.prayer",
        },
      ],
    },

    // ─── SEMANA 4 ────────────────────────────────────────────────────────────
    {
      id: "semana-4",
      titleKey: "programs.libertadEmocional.s4.title",
      lessons: [
        {
          id: "dia-16",
          titleKey: "programs.libertadEmocional.s4.d16.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "1 John 3:8",
              referenceKey: "programs.libertadEmocional.s4.d16.reference",
              textKey: "programs.libertadEmocional.s4.d16.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s4.d16.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d16.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d16.text3", style: "summary" },
          ],
          questions: [
            { id: "s4d16-q1", type: "reflection", promptKey: "programs.libertadEmocional.s4.d16.q1" },
            { id: "s4d16-q2", type: "reflection", promptKey: "programs.libertadEmocional.s4.d16.q2" },
            { id: "s4d16-journal", type: "application", promptKey: "programs.libertadEmocional.s4.d16.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s4.d16.affirmation",
          prayerKey: "programs.libertadEmocional.s4.d16.prayer",
        },
        {
          id: "dia-17",
          titleKey: "programs.libertadEmocional.s4.d17.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Genesis 50:20",
              referenceKey: "programs.libertadEmocional.s4.d17.reference",
              textKey: "programs.libertadEmocional.s4.d17.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s4.d17.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d17.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d17.text3", style: "summary" },
          ],
          questions: [
            { id: "s4d17-q1", type: "reflection", promptKey: "programs.libertadEmocional.s4.d17.q1" },
            { id: "s4d17-q2", type: "reflection", promptKey: "programs.libertadEmocional.s4.d17.q2" },
            { id: "s4d17-journal", type: "application", promptKey: "programs.libertadEmocional.s4.d17.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s4.d17.affirmation",
          prayerKey: "programs.libertadEmocional.s4.d17.prayer",
        },
        {
          id: "dia-18",
          titleKey: "programs.libertadEmocional.s4.d18.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Matthew 5:16",
              referenceKey: "programs.libertadEmocional.s4.d18.reference",
              textKey: "programs.libertadEmocional.s4.d18.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s4.d18.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d18.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d18.text3", style: "summary" },
          ],
          questions: [
            { id: "s4d18-q1", type: "reflection", promptKey: "programs.libertadEmocional.s4.d18.q1" },
            { id: "s4d18-q2", type: "reflection", promptKey: "programs.libertadEmocional.s4.d18.q2" },
            { id: "s4d18-journal", type: "application", promptKey: "programs.libertadEmocional.s4.d18.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s4.d18.affirmation",
          prayerKey: "programs.libertadEmocional.s4.d18.prayer",
        },
        {
          id: "dia-19",
          titleKey: "programs.libertadEmocional.s4.d19.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "2 Corinthians 1:4",
              referenceKey: "programs.libertadEmocional.s4.d19.reference",
              textKey: "programs.libertadEmocional.s4.d19.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s4.d19.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d19.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d19.text3", style: "summary" },
          ],
          questions: [
            { id: "s4d19-q1", type: "reflection", promptKey: "programs.libertadEmocional.s4.d19.q1" },
            { id: "s4d19-q2", type: "reflection", promptKey: "programs.libertadEmocional.s4.d19.q2" },
            { id: "s4d19-journal", type: "application", promptKey: "programs.libertadEmocional.s4.d19.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s4.d19.affirmation",
          prayerKey: "programs.libertadEmocional.s4.d19.prayer",
        },
        {
          id: "dia-20",
          titleKey: "programs.libertadEmocional.s4.d20.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "John 8:32",
              referenceKey: "programs.libertadEmocional.s4.d20.reference",
              textKey: "programs.libertadEmocional.s4.d20.verse",
            },
            { type: "text", textKey: "programs.libertadEmocional.s4.d20.text1", style: "highlight" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d20.text2" },
            { type: "text", textKey: "programs.libertadEmocional.s4.d20.text3", style: "summary" },
          ],
          questions: [
            { id: "s4d20-q1", type: "reflection", promptKey: "programs.libertadEmocional.s4.d20.q1" },
            { id: "s4d20-q2", type: "reflection", promptKey: "programs.libertadEmocional.s4.d20.q2" },
            { id: "s4d20-journal", type: "application", promptKey: "programs.libertadEmocional.s4.d20.q3" },
          ],
          affirmationKey: "programs.libertadEmocional.s4.d20.affirmation",
          prayerKey: "programs.libertadEmocional.s4.d20.prayer",
        },
      ],
    },
  ],
};

export default program;
