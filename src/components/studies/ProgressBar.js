import React from "react";

/**
 * Reusable horizontal progress bar.
 * percent: 0–100
 * size: "sm" | "md" (default "md")
 * showLabel: show percentage text (default false)
 */
export default function ProgressBar({ percent = 0, size = "md", showLabel = false, className = "" }) {
  const h = size === "sm" ? "h-1.5" : "h-2.5";
  const color =
    percent >= 100
      ? "bg-green-500"
      : percent >= 50
      ? "bg-blue-500"
      : "bg-blue-400";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-gray-200 dark:bg-gray-700 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-9 text-right shrink-0">
          {percent}%
        </span>
      )}
    </div>
  );
}
