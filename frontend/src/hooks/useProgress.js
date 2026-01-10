import { useState } from "react";

export default function useProgress() {
  const [progressMap, setProgressMap] = useState({});

  function updateProgress(courseId, percent) {
    setProgressMap((prev) => ({
      ...prev,
      [courseId]: percent,
    }));
  }

  function getProgress(courseId) {
    return progressMap[courseId] || 0;
  }

  return {
    getProgress,
    updateProgress,
  };
}
