import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2.5 justify-center items-center min-h-screen">
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/external-404-coding-tanah-basah-glyph-tanah-basah.png"
        alt="external-404-coding-tanah-basah-glyph-tanah-basah"
      />
      <h5 className="text-2xl font-semibold text-red-500">Under Development</h5>
      <h5 className="text-4xl font-bold">We will be live soon!</h5>
    </div>
  );
}
