"use client";
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Home() {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [googleIntegrationExists, setGoogleIntegrationExists] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [queryInput, setQueryInput] = useState("");

  async function handleCreateEvent() {
    setResponseLoading(true);
    try {
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: queryInput }),
      });
      const event = await response.json();
      // this is a redirect url to a result page dependent on the query result
      const { redirect, event: googleEvent } = event;
      if (redirect === "success") {
        router.replace(redirect + "?htmlLink=" + googleEvent.htmlLink);
      } else {
        router.replace(redirect);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setQueryInput("");
      setResponseLoading(false);
    }
  }

  // this use effect is to check if the user has already connected to google
  useEffect(() => {
    setPageLoading(true);
    setGoogleIntegrationExists(false);

    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith("tokenData="));
    if (cookie) {
      setGoogleIntegrationExists(true);
    }
    setPageLoading(false);
  }, []);

  if (pageLoading || responseLoading) {
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {!googleIntegrationExists ? (
        <div className="flex flex-col space-y-2 font-semibold text-2xl">
          <p>Connect to Google to get started</p>
          <a
            href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}
            className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded"
          >
            Connect to Google
          </a>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <p> Type your text below to create an event </p>
          <textarea
            className="border-2 border-gray-300 rounded-md p-2 text-black focus:outline-none focus:border-blue-700"
            onChange={(e) => {
              setQueryInput(e.target.value);
            }}
            value={queryInput}
          />
          <button
            onClick={handleCreateEvent}
            disabled={responseLoading}
            className="bg-blue-500 hover:bg-blue-700 text-sm text-center text-white font-semibold py-2 px-4 rounded"
          >
            Create Event
          </button>
        </div>
      )}
    </PageLayout>
  );
}
