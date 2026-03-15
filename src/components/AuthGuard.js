import React from "react";
import { navigate } from "gatsby";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";

/**
 * AuthGuard — protects pages that require authentication.
 *
 * Usage:
 *   <AuthGuard>  → any authenticated user
 *   <AuthGuard role="mentor">  → only mentors
 *
 * While loading it shows a spinner.
 * If not authenticated, redirects to /mi-cuenta/.
 * If wrong role, redirects to /mi-cuenta/.
 */
export default function AuthGuard({ children, role }) {
  const { user, profile, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t("auth.loading")}</p>
        </div>
      </div>
    );
  }

  if (typeof window !== "undefined" && !user) {
    navigate("/mi-cuenta/");
    return null;
  }

  if (role && profile?.role !== role && profile?.role !== "admin") {
    if (typeof window !== "undefined") navigate("/mi-cuenta/");
    return null;
  }

  return <>{children}</>;
}
