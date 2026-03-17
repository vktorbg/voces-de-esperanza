import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Enrollment ─────────────────────────────────────────────────────────────

/**
 * Enroll a student in a program.
 * Creates the enrollment doc and adds the programId to the user's profile.
 */
export async function enrollInProgram(userId, programId) {
  const enrollId = `${userId}_${programId}`;
  const enrollRef = doc(db, "enrollments", enrollId);
  const snap = await getDoc(enrollRef);
  if (snap.exists()) return; // already enrolled

  await setDoc(enrollRef, {
    userId,
    programId,
    enrolledAt: serverTimestamp(),
    status: "active",
    completedLessons: [],
    percentComplete: 0,
  });

  await updateDoc(doc(db, "users", userId), {
    enrolledPrograms: arrayUnion(programId),
  });
}

/**
 * Get the enrollment document for a user/program pair.
 * Returns null if not enrolled.
 */
export async function getEnrollment(userId, programId) {
  const snap = await getDoc(doc(db, "enrollments", `${userId}_${programId}`));
  return snap.exists() ? snap.data() : null;
}

/**
 * Get all enrollments for a student (for dashboard).
 */
export async function getStudentEnrollments(userId) {
  const q = query(collection(db, "enrollments"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── Progress ────────────────────────────────────────────────────────────────

/**
 * Mark a lesson as completed and recalculate percentComplete.
 * totalLessons: total number of lessons in the program (pass from program data).
 */
export async function markLessonComplete(userId, programId, lessonId, totalLessons) {
  const enrollRef = doc(db, "enrollments", `${userId}_${programId}`);
  const snap = await getDoc(enrollRef);
  if (!snap.exists()) return;

  const data = snap.data();
  const completed = data.completedLessons || [];
  if (completed.includes(lessonId)) return; // already done

  const newCompleted = [...completed, lessonId];
  const percent = Math.round((newCompleted.length / totalLessons) * 100);

  await updateDoc(enrollRef, {
    completedLessons: arrayUnion(lessonId),
    percentComplete: percent,
    status: percent >= 100 ? "completed" : "active",
  });
}

// ─── Responses ───────────────────────────────────────────────────────────────

/**
 * Save (or overwrite) a student's answer to a question.
 * language: 'es' | 'en' — the language the student was using when answering.
 */
export async function saveResponse(userId, programId, lessonId, questionId, answer, moduleId, language = "es") {
  const qId = questionId.toLowerCase();
  const responseId = `${userId}_${programId}_${lessonId}_${qId}`;
  await setDoc(
    doc(db, "responses", responseId),
    {
      userId,
      programId,
      moduleId: moduleId || null,
      lessonId,
      questionId: qId,
      answer,
      language,
      savedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Get all responses for a student within a specific lesson.
 * Uses only userId filter to avoid composite index requirement,
 * then filters client-side by programId + lessonId.
 */
export async function getLessonResponses(userId, programId, lessonId) {
  const q = query(
    collection(db, "responses"),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  const map = {};
  snap.docs.forEach((d) => {
    const data = d.data();
    if (data.programId === programId && data.lessonId === lessonId) {
      map[data.questionId] = { id: d.id, ...data };
    }
  });
  return map;
}

/**
 * Get all responses for a student in a program (for mentor view).
 */
export async function getProgramResponses(userId, programId) {
  const q = query(
    collection(db, "responses"),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((d) => d.programId === programId);
}

// ─── Mentor feedback ─────────────────────────────────────────────────────────

/**
 * Save or update mentor feedback on a specific response document.
 */
export async function saveMentorFeedback(responseDocId, feedbackText) {
  await updateDoc(doc(db, "responses", responseDocId), {
    mentorFeedback: {
      text: feedbackText,
      at: serverTimestamp(),
    },
  });
}

// ─── Mentor students ─────────────────────────────────────────────────────────

/**
 * Get all students assigned to a mentor (by mentorId field on user profile).
 */
export async function getMentorStudents(mentorId) {
  const q = query(collection(db, "users"), where("mentorId", "==", mentorId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}
