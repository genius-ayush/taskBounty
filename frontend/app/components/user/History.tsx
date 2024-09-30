'use client'
import { useTheme } from 'next-themes';
import React from 'react'

function History() {
    const { theme } = useTheme();
  let darkMode = false;

  if (theme == "dark") {
    darkMode = true;
  } else {
    darkMode = false;
  }
  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      >
      <div>History</div>
      </div>
  )
}

export default History