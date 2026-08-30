// import React from "react";
import Header from "../components/UI/header";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full sticky z-10 top-0">
        <div className="max-w-7xl mx-auto  ">
          <Header />
        </div>
      </div>
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}

export default DashBoardLayout;
