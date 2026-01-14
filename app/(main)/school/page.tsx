"use client";
import GetStartedSchool from "@/app/components/school/GetStartedSchool";
import React, { useState } from "react";

const SchoolDashboard = () => {
  return (
    <div className="p-0">
      {/* <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Overview of students performance
        </p>
      </div> */}

      <GetStartedSchool />
    </div>
  );
};

export default SchoolDashboard;
