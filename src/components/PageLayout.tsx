import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-2 w-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default PageLayout;
