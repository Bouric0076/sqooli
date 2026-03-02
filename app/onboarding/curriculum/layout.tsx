import React from "react";

export default function CurriculumnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </>
  );
}
