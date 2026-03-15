/**
 * Estudio: Libertad Emocional
 * 4 semanas / 20 días
 * Fuente: Estudio-Libertad-Emocional.pdf
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
              reference: "Proverbios 4:23 (NBLA)",
              text: "Con toda diligencia guarda tu corazón, porque de él brotan los manantiales de la vida.",
            },
            {
              type: "text",
              text: "Tu corazón es el registro de tu historia — protégelo con verdad.",
              style: "highlight",
            },
            {
              type: "text",
              text: "Tu corazón (mente/emociones) ha almacenado toda tu historia: lo que te hicieron, lo que hiciste, y lo que creíste. Hoy comienza el proceso de abrir tu corazón para que Dios te muestre lo que aún está controlando tus reacciones.",
            },
            {
              type: "text",
              text: "Tu sistema de creencias guía tus emociones. Para sanar, debes permitir que Dios revele lo que hay en tu corazón.",
              style: "summary",
            },
          ],
          questions: [
            {
              id: "s1d1-q1",
              type: "reflection",
              prompt: "¿Qué recuerdos o emociones te afectan profundamente?",
            },
            {
              id: "s1d1-q2",
              type: "reflection",
              prompt: "¿Qué mentiras has creído sobre ti mismo basadas en el abuso o rechazo?",
            },
            {
              id: "s1d1-journal",
              type: "application",
              prompt: "Escribe una descripción de cómo te sientes hoy y una experiencia que marcó tu niñez emocionalmente.",
            },
          ],
          affirmation: "Dios está sanando mi historia.",
          prayer: "Padre, te entrego mi corazón. Ayúdame a ver con claridad lo que he creído y lo que me ha hecho daño. Quiero empezar un camino de verdad contigo.",
        },
        {
          id: "dia-2",
          titleKey: "programs.libertadEmocional.s1.d2.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Mateo 15:19 (NBLA)",
              text: "Del corazón provienen malos pensamientos… fornicaciones… calumnias.",
            },
            {
              type: "text",
              text: "Tus emociones no vienen del momento — vienen de lo que creíste.",
              style: "highlight",
            },
            {
              type: "text",
              text: "Las emociones negativas actuales como vergüenza, confusión sexual, o enojo, tienen raíz en eventos pasados y en lo que creíste sobre ti mismo.",
            },
            {
              type: "text",
              text: "Las emociones negativas se alimentan de mentiras profundas, no solo de eventos.",
              style: "summary",
            },
          ],
          questions: [
            {
              id: "s1d2-q1",
              type: "reflection",
              prompt: "¿Cuáles emociones negativas experimentas frecuentemente?",
            },
            {
              id: "s1d2-q2",
              type: "reflection",
              prompt: "¿Cuál es el primer recuerdo donde sentiste eso?",
            },
            {
              id: "s1d2-journal",
              type: "application",
              prompt: "Comienza una lista de emociones que te controlan. Añade recuerdos o eventos que asocias con ellas.",
            },
          ],
          affirmation: "Puedo mirar mi pasado con la verdad de Dios.",
          prayer: "Jesús, muéstrame la verdad detrás de mis emociones. Ayúdame a reconocer lo que no he querido enfrentar.",
        },
        {
          id: "dia-3",
          titleKey: "programs.libertadEmocional.s1.d3.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Proverbios 23:7 (NBLA)",
              text: "Como piensa dentro de sí, así es él.",
            },
            {
              type: "text",
              text: "Tu identidad no la define el abuso — la define Dios.",
              style: "highlight",
            },
            {
              type: "text",
              text: "Muchas personas abusadas creen mentiras como \"estoy sucio\", \"nadie me va a amar\", o \"esto fue mi culpa\". Estas mentiras necesitan ser identificadas para poder sanarlas.",
            },
            {
              type: "text",
              text: "Identificar la mentira es el primer paso para romper su poder.",
              style: "summary",
            },
          ],
          questions: [
            {
              id: "s1d3-q1",
              type: "reflection",
              prompt: "¿Qué mentiras has repetido en tu mente por años?",
            },
            {
              id: "s1d3-q2",
              type: "reflection",
              prompt: "¿Cuál fue la herida o persona que las inició?",
            },
            {
              id: "s1d3-journal",
              type: "application",
              prompt: "Escribe frases que creíste sobre ti. Luego escríbelas de nuevo tachando cada mentira y escribe una verdad de Dios al lado.",
            },
          ],
          affirmation: "Mi identidad está en Cristo, no en el abuso.",
          prayer: "Dios mío, revela las mentiras que han moldeado mi identidad. Declaro que Tú me diste un nuevo nombre y un nuevo corazón.",
        },
        {
          id: "dia-4",
          titleKey: "programs.libertadEmocional.s1.d4.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "1 Juan 1:9 (NBLA)",
              text: "Si confesamos nuestros pecados, Él es fiel… para limpiarnos de toda maldad.",
            },
            {
              type: "text",
              text: "La confesión no es vergüenza — es el comienzo de la libertad.",
              style: "highlight",
            },
            {
              type: "text",
              text: "Confesar no solo tus reacciones, sino también los pecados que cometieron contra ti, rompe la prisión del silencio. Confesar es declarar lo que pasó y rendirlo a Dios.",
            },
            {
              type: "text",
              text: "Al declarar el dolor en voz alta, invitas a Dios a sanarlo.",
              style: "summary",
            },
          ],
          questions: [
            {
              id: "s1d4-q1",
              type: "reflection",
              prompt: "¿Qué fue lo que más te dolió del abuso?",
            },
            {
              id: "s1d4-q2",
              type: "reflection",
              prompt: "¿Qué quisieras decirle a tu ofensor en presencia de Dios?",
            },
            {
              id: "s1d4-journal",
              type: "application",
              prompt: "Escribe una carta que nunca enviarás a tu agresor. Dila en voz alta como una oración frente a Jesús.",
            },
          ],
          affirmation: "Mi voz tiene poder delante de Dios.",
          prayer: "Jesús, Tú viste todo. Hoy confieso delante de Ti lo que viví. Renuncio al silencio y recibo Tu consuelo.",
        },
        {
          id: "dia-5",
          titleKey: "programs.libertadEmocional.s1.d5.title",
          contentBlocks: [
            {
              type: "verse",
              reference: "Apocalipsis 12:11 (NBLA)",
              text: "Ellos lo vencieron por medio de la sangre del Cordero y por la palabra del testimonio de ellos.",
            },
            {
              type: "text",
              text: "Renuncio a la mentira — declaro la verdad de Dios.",
              style: "highlight",
            },
            {
              type: "text",
              text: "La sanidad no está completa hasta que las mentiras son reemplazadas con verdades. Hay poder en hablar lo que Dios dice de ti.",
            },
            {
              type: "text",
              text: "Dios te ha dado el poder para renunciar a las mentiras y vivir según la verdad.",
              style: "summary",
            },
          ],
          questions: [
            {
              id: "s1d5-q1",
              type: "reflection",
              prompt: "¿Qué verdades necesitas declarar hoy?",
            },
            {
              id: "s1d5-q2",
              type: "reflection",
              prompt: "¿Qué afirmación bíblica puedes repetir todos los días?",
            },
            {
              id: "s1d5-journal",
              type: "application",
              prompt: "Crea una lista de declaraciones bíblicas que puedes leer cada mañana.",
            },
          ],
          affirmation: "Soy limpio, amado y escogido por Dios.",
          prayer: "Declaro que soy libre en Cristo. Renuncio a la mentira que dice que estoy sucio. Soy limpiado por la sangre de Jesús.",
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
            { type: "verse", reference: "Juan 8:32 (NBLA)", text: "Y conocerán la verdad, y la verdad los hará libres." },
            { type: "text", text: "Las emociones muestran el camino hacia las heridas que Dios quiere sanar.", style: "highlight" },
            { type: "text", text: "Detrás de cada emoción fuerte hay una historia no resuelta. Tus heridas del pasado necesitan ser reconocidas, no enterradas." },
            { type: "text", text: "Las heridas emocionales no desaparecen por ignorarlas — deben ser sanadas con verdad.", style: "summary" },
          ],
          questions: [
            { id: "s2d6-q1", type: "reflection", prompt: "¿Qué eventos de tu infancia todavía te causan dolor?" },
            { id: "s2d6-q2", type: "reflection", prompt: "¿Hay alguien que todavía evitas pensar por lo que te hizo?" },
            { id: "s2d6-journal", type: "application", prompt: "Escribe una lista de personas o eventos que te hicieron daño. Sé honesto con los sentimientos que todavía provocan." },
          ],
          affirmation: "No tengo que esconder mis heridas — Dios quiere sanarlas.",
          prayer: "Padre, muéstrame las heridas que he ignorado. Quiero verlas contigo para que tú las sanes.",
        },
        {
          id: "dia-7",
          titleKey: "programs.libertadEmocional.s2.d7.title",
          contentBlocks: [
            { type: "verse", reference: "Salmo 34:18 (NBLA)", text: "El Señor está cerca de los quebrantados de corazón, y salva a los abatidos de espíritu." },
            { type: "text", text: "Dios no te deja solo cuando vuelves al pasado — Él ya estaba allí.", style: "highlight" },
            { type: "text", text: "Volver emocionalmente a recuerdos difíciles no es para sufrir más, sino para permitir que Dios entre a esa memoria y la sane." },
            { type: "text", text: "No revives el pasado solo — Dios te acompaña en cada paso.", style: "summary" },
          ],
          questions: [
            { id: "s2d7-q1", type: "reflection", prompt: "¿Qué te impide recordar sin temor?" },
            { id: "s2d7-q2", type: "reflection", prompt: "¿Qué crees que Dios quiere mostrarte en ese recuerdo?" },
            { id: "s2d7-journal", type: "application", prompt: "Escribe un recuerdo doloroso y lo que sentiste. Luego escribe cómo te imaginas a Jesús apareciendo en esa escena." },
          ],
          affirmation: "Dios me encuentra en mi dolor, no me abandona.",
          prayer: "Jesús, entra conmigo a mis recuerdos. Sana las imágenes que me persiguen y lléname con tu presencia.",
        },
        {
          id: "dia-8",
          titleKey: "programs.libertadEmocional.s2.d8.title",
          contentBlocks: [
            { type: "verse", reference: "Lucas 23:34 (NBLA)", text: "Padre, perdónalos, porque no saben lo que hacen." },
            { type: "text", text: "El perdón no justifica lo que te hicieron — libera tu corazón del control del pasado.", style: "highlight" },
            { type: "text", text: "Perdonar no es olvidar ni aprobar el daño. Es liberar el corazón del resentimiento que te mantiene atado." },
            { type: "text", text: "El perdón es un regalo que te haces a ti mismo en la presencia de Dios.", style: "summary" },
          ],
          questions: [
            { id: "s2d8-q1", type: "reflection", prompt: "¿Qué emociones sientes cuando piensas en quien te abusó?" },
            { id: "s2d8-q2", type: "reflection", prompt: "¿Qué temes perder si perdonas?" },
            { id: "s2d8-journal", type: "application", prompt: "Escribe una oración nombrando lo que te hicieron y decidiendo entregar esa carga a Dios." },
          ],
          affirmation: "Perdonar me libera, no me debilita.",
          prayer: "Dios mío, es difícil perdonar, pero hoy doy este paso. Libero mi alma del peso del rencor.",
        },
        {
          id: "dia-9",
          titleKey: "programs.libertadEmocional.s2.d9.title",
          contentBlocks: [
            { type: "verse", reference: "Romanos 12:19 (NBLA)", text: "Mía es la venganza, Yo pagaré, dice el Señor." },
            { type: "text", text: "La justicia de Dios va más allá de la tuya — Él ve todo.", style: "highlight" },
            { type: "text", text: "Liberarte del deseo de venganza te abre a recibir la sanidad completa. Dios no ignora el dolor; Él juzgará con justicia." },
            { type: "text", text: "No tienes que ser juez — solo hijo sanado.", style: "summary" },
          ],
          questions: [
            { id: "s2d9-q1", type: "reflection", prompt: "¿Has querido que tu ofensor sufra lo que tú sufriste?" },
            { id: "s2d9-q2", type: "reflection", prompt: "¿Qué pasaría si dejaras la justicia completamente en manos de Dios?" },
            { id: "s2d9-journal", type: "application", prompt: "Escribe lo que te gustaría que Dios hiciera con esa persona. Luego entrégaselo y di: \"Confío en tu justicia.\"" },
          ],
          affirmation: "Dios es mi defensor.",
          prayer: "Señor, renuncio al deseo de venganza. Tú eres justo y fiel, yo confío en Ti.",
        },
        {
          id: "dia-10",
          titleKey: "programs.libertadEmocional.s2.d10.title",
          contentBlocks: [
            { type: "verse", reference: "Filipenses 3:13 (NBLA)", text: "Olvidando lo que queda atrás y extendiéndome a lo que está delante." },
            { type: "text", text: "No puedes cambiar tu historia, pero sí puedes cambiar su poder sobre ti.", style: "highlight" },
            { type: "text", text: "Decir adiós es un acto de fe. No borra el pasado, pero rompe su control." },
            { type: "text", text: "El pasado ya no define tu presente cuando lo sueltas en Cristo.", style: "summary" },
          ],
          questions: [
            { id: "s2d10-q1", type: "reflection", prompt: "¿Qué parte de tu historia sigues repitiendo en tu mente?" },
            { id: "s2d10-q2", type: "reflection", prompt: "¿Qué te impide soltarla?" },
            { id: "s2d10-journal", type: "application", prompt: "Escribe una despedida simbólica al pasado. Usa palabras como \"te libero\", \"me despido\", \"no me defines\"." },
          ],
          affirmation: "Mi pasado está en las manos de Dios, no en las mías.",
          prayer: "Señor Jesús, hoy digo adiós al control de mi historia. Tú me llevas hacia adelante.",
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
            { type: "verse", reference: "Juan 8:44 (NBLA)", text: "El diablo… no hay verdad en él… porque es mentiroso y padre de mentira." },
            { type: "text", text: "Las mentiras no son tuyas — fueron sembradas para destruirte.", style: "highlight" },
            { type: "text", text: "Muchas mentiras fueron instaladas por experiencias dolorosas. Hoy es tiempo de identificarlas con la ayuda del Espíritu Santo." },
            { type: "text", text: "Cada mentira que descubres, es una cadena que puedes romper.", style: "summary" },
          ],
          questions: [
            { id: "s3d11-q1", type: "reflection", prompt: "¿Qué frases negativas repites sobre ti mismo?" },
            { id: "s3d11-q2", type: "reflection", prompt: "¿Cuál fue la situación donde esas frases comenzaron a sonar verdad?" },
            { id: "s3d11-journal", type: "application", prompt: "Escribe una lista de mentiras que has creído sobre ti, tu valor y tu sexualidad. Luego escríbelas nuevamente, añadiendo: \"Esta es una mentira, y hoy la rechazo.\"" },
          ],
          affirmation: "Ya no acepto mentiras como parte de mi identidad.",
          prayer: "Espíritu Santo, tráeme a la mente las mentiras que he creído. No quiero vivir más en engaño.",
        },
        {
          id: "dia-12",
          titleKey: "programs.libertadEmocional.s3.d12.title",
          contentBlocks: [
            { type: "verse", reference: "Efesios 4:27 (NBLA)", text: "No den oportunidad al diablo." },
            { type: "text", text: "Las mentiras pierden poder cuando tú las nombras y las rechazas.", style: "highlight" },
            { type: "text", text: "Renunciar es soltar toda alianza con lo falso. Al hacerlo, cierras puertas al enemigo y preparas tu mente para la verdad." },
            { type: "text", text: "Renunciar no es ignorar, es declarar guerra espiritual.", style: "summary" },
          ],
          questions: [
            { id: "s3d12-q1", type: "reflection", prompt: "¿Qué mentira has tolerado por más tiempo?" },
            { id: "s3d12-q2", type: "reflection", prompt: "¿Qué temes perder si dejas de creer esa mentira?" },
            { id: "s3d12-journal", type: "application", prompt: "Escribe esta frase con cada mentira: \"Renuncio a la mentira que dice ___. Declaro que en Cristo, la verdad es ___.\"" },
          ],
          affirmation: "Renuncio al engaño — recibo la verdad de Dios.",
          prayer: "Renuncio a la mentira que dice [nombre la mentira]. Esta no tiene autoridad sobre mí. Pertenezco a Cristo.",
        },
        {
          id: "dia-13",
          titleKey: "programs.libertadEmocional.s3.d13.title",
          contentBlocks: [
            { type: "verse", reference: "Romanos 12:2 (NBLA)", text: "Serán transformados mediante la renovación de su mente." },
            { type: "text", text: "No basta con sacar la mentira — hay que llenarse de verdad.", style: "highlight" },
            { type: "text", text: "Jesús usó la Escritura para resistir al enemigo. Tú también necesitas llenar tu mente con la verdad de Dios." },
            { type: "text", text: "Reemplazar es llenar tu mente con la verdad que produce libertad.", style: "summary" },
          ],
          questions: [
            { id: "s3d13-q1", type: "reflection", prompt: "¿Qué dice la Palabra de Dios sobre tu valor, tu cuerpo, y tu propósito?" },
            { id: "s3d13-q2", type: "reflection", prompt: "¿Qué versículo puedes memorizar hoy como declaración personal?" },
            { id: "s3d13-journal", type: "application", prompt: "Escribe tres verdades bíblicas que contradicen las mentiras que creías. Repítelas en voz alta." },
          ],
          affirmation: "Soy renovado por la verdad de Dios.",
          prayer: "Señor, llena mi mente con tu Palabra. Que la verdad sustituya cada mentira.",
        },
        {
          id: "dia-14",
          titleKey: "programs.libertadEmocional.s3.d14.title",
          contentBlocks: [
            { type: "verse", reference: "1 Juan 1:9 (NBLA)", text: "Si confesamos nuestros pecados, Él es fiel y justo para perdonarnos." },
            { type: "text", text: "El perdón no es un sentimiento — es una promesa.", style: "highlight" },
            { type: "text", text: "Aunque luches con atracciones o comportamientos, el perdón de Dios está disponible si vienes con humildad y verdad." },
            { type: "text", text: "El perdón es un regalo divino, no un premio por tu desempeño.", style: "summary" },
          ],
          questions: [
            { id: "s3d14-q1", type: "reflection", prompt: "¿Sientes que hay cosas que Dios no puede perdonar?" },
            { id: "s3d14-q2", type: "reflection", prompt: "¿Qué te impide recibir su perdón plenamente?" },
            { id: "s3d14-journal", type: "application", prompt: "Escribe una carta a ti mismo desde la perspectiva de Dios, afirmando su perdón y amor incondicional." },
          ],
          affirmation: "Soy perdonado, limpio y amado por Dios.",
          prayer: "Señor, me acerco con lo que soy. Te confieso mis fallas y recibo tu perdón. Gracias por limpiarme.",
        },
        {
          id: "dia-15",
          titleKey: "programs.libertadEmocional.s3.d15.title",
          contentBlocks: [
            { type: "verse", reference: "Juan 10:10 (NBLA)", text: "El ladrón solo viene para robar, matar y destruir; Yo he venido para que tengan vida." },
            { type: "text", text: "Dios quiere devolverte lo que el enemigo te robó.", style: "highlight" },
            { type: "text", text: "Tu gozo, tu identidad, tu capacidad de amar y recibir amor — todo puede ser restaurado en Cristo." },
            { type: "text", text: "El enemigo robó, pero Dios restaura con abundancia.", style: "summary" },
          ],
          questions: [
            { id: "s3d15-q1", type: "reflection", prompt: "¿Qué te robó el abuso, el pecado o las mentiras?" },
            { id: "s3d15-q2", type: "reflection", prompt: "¿Qué cosas deseas ver restauradas por Dios?" },
            { id: "s3d15-journal", type: "application", prompt: "Escribe lo que deseas que Dios restaure. Haz una lista de oración de lo que anhelas recuperar con su ayuda." },
          ],
          affirmation: "Recupero lo que me pertenece como hijo de Dios.",
          prayer: "Padre, recupero mi dignidad, mi gozo, y mi libertad en Ti. Nada de lo que me quitaron es mayor que lo que tú me das.",
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
            { type: "verse", reference: "1 Juan 3:8 (NBLA)", text: "El Hijo de Dios se manifestó para destruir las obras del diablo." },
            { type: "text", text: "Tu historia ya no tiene que controlarte — Cristo es tu nueva raíz.", style: "highlight" },
            { type: "text", text: "No puedes cambiar lo que ocurrió, pero puedes elegir que ya no te controle. Jesús destruyó el poder del pasado." },
            { type: "text", text: "Romper con el control del pasado es posible en Cristo.", style: "summary" },
          ],
          questions: [
            { id: "s4d16-q1", type: "reflection", prompt: "¿Qué parte de tu historia sigue teniendo poder sobre ti?" },
            { id: "s4d16-q2", type: "reflection", prompt: "¿Cómo sería tu vida si ya no vivieras desde ese dolor?" },
            { id: "s4d16-journal", type: "application", prompt: "Escribe la parte más difícil de tu historia. Luego escribe: \"Rompo con este control en el nombre de Jesús.\"" },
          ],
          affirmation: "Mi historia ya no me controla — Cristo me hace libre.",
          prayer: "Señor, declaro que el pasado ya no me define. Rompo su poder en el nombre de Jesús.",
        },
        {
          id: "dia-17",
          titleKey: "programs.libertadEmocional.s4.d17.title",
          contentBlocks: [
            { type: "verse", reference: "Génesis 50:20 (NBLA)", text: "Ustedes pensaron hacerme mal, pero Dios lo cambió en bien." },
            { type: "text", text: "Tus heridas no son tu final — son el inicio de tu propósito.", style: "highlight" },
            { type: "text", text: "Aceptar las consecuencias no es resignarse, es confiar que Dios usará todo para tu bien." },
            { type: "text", text: "Aceptar con esperanza te prepara para ser instrumento de Dios.", style: "summary" },
          ],
          questions: [
            { id: "s4d17-q1", type: "reflection", prompt: "¿Qué pérdidas has sufrido por causa del abuso o pecado?" },
            { id: "s4d17-q2", type: "reflection", prompt: "¿Puedes creer que Dios usará tu historia para bien?" },
            { id: "s4d17-journal", type: "application", prompt: "Escribe tus pérdidas y luego escribe junto a cada una: \"Dios puede usar esto para bien.\"" },
          ],
          affirmation: "Mi dolor se convierte en propósito.",
          prayer: "Padre, acepto las consecuencias de lo que viví. Transfórmalas en bendición para otros.",
        },
        {
          id: "dia-18",
          titleKey: "programs.libertadEmocional.s4.d18.title",
          contentBlocks: [
            { type: "verse", reference: "Mateo 5:16 (NBLA)", text: "Así brille la luz de ustedes… y glorifiquen a su Padre." },
            { type: "text", text: "Tu sanidad no es solo para ti — es para mostrar la gloria de Dios.", style: "highlight" },
            { type: "text", text: "Cuando vives en libertad, otros pueden ver la obra de Dios en ti y buscar esa misma esperanza." },
            { type: "text", text: "Tu vida restaurada es un testimonio vivo del poder de Dios.", style: "summary" },
          ],
          questions: [
            { id: "s4d18-q1", type: "reflection", prompt: "¿Qué evidencia hay en tu vida de la sanidad de Dios?" },
            { id: "s4d18-q2", type: "reflection", prompt: "¿Cómo puedes compartir tu testimonio sin vergüenza?" },
            { id: "s4d18-journal", type: "application", prompt: "Escribe lo que te gustaría que otros supieran de tu proceso y lo que Dios ha hecho en ti." },
          ],
          affirmation: "Soy un trofeo de la sanidad de Dios.",
          prayer: "Señor, que mi historia redimida hable más fuerte que mi pasado.",
        },
        {
          id: "dia-19",
          titleKey: "programs.libertadEmocional.s4.d19.title",
          contentBlocks: [
            { type: "verse", reference: "2 Corintios 1:4 (NBLA)", text: "Consolamos a otros con el consuelo que hemos recibido." },
            { type: "text", text: "Tu sanidad encuentra plenitud cuando ayudas a otros a sanar.", style: "highlight" },
            { type: "text", text: "Compartir lo que Dios ha hecho en ti no solo bendice a otros — fortalece tu propia libertad." },
            { type: "text", text: "Tu testimonio puede abrir la puerta de libertad para otros.", style: "summary" },
          ],
          questions: [
            { id: "s4d19-q1", type: "reflection", prompt: "¿A quién podrías ayudar con tu historia?" },
            { id: "s4d19-q2", type: "reflection", prompt: "¿Qué podrías decirles que les dé esperanza?" },
            { id: "s4d19-journal", type: "application", prompt: "Escribe el nombre de alguien que necesita consuelo. Ora por él y anota lo que podrías compartir de tu historia." },
          ],
          affirmation: "Mi historia sanada es una herramienta de esperanza.",
          prayer: "Muéstrame, Señor, cómo usar mi historia para consolar a otros que sufren.",
        },
        {
          id: "dia-20",
          titleKey: "programs.libertadEmocional.s4.d20.title",
          contentBlocks: [
            { type: "verse", reference: "Juan 8:32 (NBLA)", text: "Conocerán la verdad, y la verdad los hará libres." },
            { type: "text", text: "La libertad se alimenta todos los días con verdad.", style: "highlight" },
            { type: "text", text: "No basta con haber sido sanado. La libertad se mantiene al caminar en verdad y renovar la mente constantemente." },
            { type: "text", text: "La libertad en Cristo es continua y firme cuando se vive desde la verdad.", style: "summary" },
          ],
          questions: [
            { id: "s4d20-q1", type: "reflection", prompt: "¿Qué prácticas necesitas seguir para mantener tu libertad?" },
            { id: "s4d20-q2", type: "reflection", prompt: "¿Qué verdad necesitas declarar cada día?" },
            { id: "s4d20-journal", type: "application", prompt: "Crea tu declaración de libertad personal con base en todo lo aprendido. Escríbela y léela en voz alta cada mañana." },
          ],
          affirmation: "Soy libre, y seguiré caminando en verdad.",
          prayer: "Padre, hoy proclamo mi libertad. No volveré atrás. Viviré en tu verdad.",
        },
      ],
    },
  ],
};

export default program;
