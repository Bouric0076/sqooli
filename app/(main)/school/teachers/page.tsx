"use client";

import NotFoundItem from "@/app/components/errors/NotFoundItem";

export default function SchoolTeachersPage() {
  return (
    <div className="p-0">
      <NotFoundItem
        title="You have no teacher`s "
        description="Setup teachers for your school to manage classes and students."
        link="/school/teachers/new"
      />
    </div>
  );
}
