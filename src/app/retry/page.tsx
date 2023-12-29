"use client";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/navigation";
import QueryResultDisplay from "@/components/QueryResultDisplay";

function Retry() {
  const router = useRouter();

  return (
    <PageLayout>
      <QueryResultDisplay
        resultText="🤔 The query was too vague to create an event 🤔"
        buttonText="Try again"
      />
    </PageLayout>
  );
}

export default Retry;
