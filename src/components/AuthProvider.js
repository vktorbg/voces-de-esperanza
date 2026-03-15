import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange, getUserProfile } from "../services/auth-service";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

const AuthContext = createContext(null);

/**
 * Provides the authenticated user and their Firestore profile to the whole app.
 * Wrap your app (or Layout) with this provider.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Firebase Auth user
  const [profile, setProfile] = useState(null); // Firestore user document
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          let prof = await getUserProfile(firebaseUser.uid);
          // If no Firestore profile yet, create it automatically
          if (!prof) {
            await setDoc(doc(db, "users", firebaseUser.uid), {
              displayName: firebaseUser.displayName || firebaseUser.email,
              email: firebaseUser.email,
              role: "student",
              language: "es",
              enrolledPrograms: [],
              createdAt: serverTimestamp(),
            });
            prof = await getUserProfile(firebaseUser.uid);
          }
          setProfile(prof);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("AuthProvider error:", err);
        setUser(firebaseUser ?? null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to consume auth context anywhere in the tree.
 * Returns { user, profile, loading, isMentor, isStudent }
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return {
    ...ctx,
    isAdmin:   ctx.profile?.role === "admin",
    isMentor:  ctx.profile?.role === "mentor" || ctx.profile?.role === "admin",
    isStudent: ctx.profile?.role === "student",
  };
}
