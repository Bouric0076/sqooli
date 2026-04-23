import React from "react";

const ScrollTable = () => {
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = Array.from({ length: 10 }, (_, i) => ({
    name: `User ${i + 1}`,
  }));

  return (
    <div className="border rounded-lg">
      
      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse">
          
          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              {days.map((day) => (
                <th key={day} className="p-3 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{row.name}</td>

                {days.map((day, j) => (
                  <td key={j} className="p-3 text-center">
                    ✓
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ScrollTable;