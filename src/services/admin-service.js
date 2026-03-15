import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Get all registered users.
 */
export async function getAllUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}

/**
 * Update a user's role: "student" | "mentor" | "admin"
 */
export async function setUserRole(uid, role) {
  await updateDoc(doc(db, "users", uid), { role });
}

/**
 * Assign a mentor to a student (sets mentorId on the student's profile).
 * Pass null to unassign.
 */
export async function assignMentor(studentUid, mentorUid) {
  await updateDoc(doc(db, "users", studentUid), {
    mentorId: mentorUid || null,
  });
}
