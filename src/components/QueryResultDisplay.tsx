"use client";
import { useRouter } from "next/navigation";
import React from "react";

function QueryResultDisplay({
  resultText,
  buttonText,
  eventLink,
}: {
  resultText: string;
  buttonText: string;
  eventLink?: string;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <p> {resultText} </p>
      {eventLink && (
        <a
          href={eventLink}
          target="_blank"
          className="text-blue-500 hover:underline text-sm text-center font-semibold mb-4"
        >
          View event in Google Calendar
        </a>
      )}
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 hover:bg-blue-700 text-sm text-center text-white font-semibold py-2 px-4 rounded"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default QueryResultDisplay;
