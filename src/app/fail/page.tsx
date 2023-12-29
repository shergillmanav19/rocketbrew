"use client";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/navigation";
import QueryResultDisplay from "@/components/QueryResultDisplay";

function Fail() {
  const router = useRouter();

  return (
    <PageLayout>
      <QueryResultDisplay
        resultText="😢 Your event creation failed 😢"
        buttonText="Try again"
      />
    </PageLayout>
  );
}

export default Fail;
