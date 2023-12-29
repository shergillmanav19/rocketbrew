"use client";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { useRouter, useSearchParams } from "next/navigation";
import QueryResultDisplay from "@/components/QueryResultDisplay";

function Success() {
  const router = useRouter();
  const params = useSearchParams();

  const htmlLink = params.get("htmlLink");

  return (
    <PageLayout>
      <QueryResultDisplay
        resultText="😎 Your event was successfully created 😎"
        eventLink={htmlLink || undefined}
        buttonText="Create more"
      />
    </PageLayout>
  );
}

export default Success;
