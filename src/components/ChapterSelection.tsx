import React from "react";
import { goToChapter } from "../reducers";
import { chapters } from "../types";
import { useDispatch } from "react-redux";

export function ChapterSelection() {
  const dispatch = useDispatch();
  return (
    <div style={{ position: "absolute", top: 0 }}>
      {chapters.map((chapter) => (
        <button
          key={`go-to-chapter-${chapter}-button`}
          onClick={() => dispatch(goToChapter(chapter))}
        >
          Chapter {chapter}
        </button>
      ))}
    </div>
  );
}
