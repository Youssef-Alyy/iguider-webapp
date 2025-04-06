import React from "react";

export default function PasswordStrengthBar({ className, score, password }) {
  return (
    <>
      <div
        className={`text-sm font-nunito font-bold text-gray-500 pl-2 ${className}`}
      >
        Status:{" "}
        <span
          className={`${
            score <= 0
              ? "text-red-500"
              : score === 1
              ? "text-yellow-500"
              : score === 2
              ? "text-orange-500"
              : score === 3
              ? "text-lime-500"
              : score === 4
              ? "text-green-500"
              : ""
          }`}
        >
          {score <= 0 && password.length > 0
            ? "Very Weak"
            : score === 1
            ? "Weak"
            : score === 2
            ? "Moderate"
            : score === 3
            ? "Strong"
            : score === 4
            ? "Very Strong"
            : ""}
        </span>
      </div>

      <div className="-mx-1 pl-1 w-full">
        <div className="px-1 grid grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 mt-1 rounded-xl transition-colors ${
                i < score
                  ? score <= 0
                    ? "bg-red-500"
                    : score === 1
                    ? "bg-yellow-500"
                    : score === 2
                    ? "bg-orange-500"
                    : score === 3
                    ? "bg-lime-500"
                    : score === 4
                    ? "bg-green-500"
                    : "bg-red-800"
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
