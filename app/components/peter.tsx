import React, { useState } from "react";

function Peter() {
  const [count, setCount] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`relative bg-blue-500 transition-all duration-300 ${
          isSidebarOpen ? "w-48" : "w-0"
        }`}
      >
        {/* Sidebar content */}
        {isSidebarOpen && (
          <nav className="p-4 text-white">
            <p className="font-bold">Menu</p>
          </nav>
        )}

        {/* Protruding Hamburger */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="
            absolute top-6 -right-5
            h-10 w-10
            bg-blue-500 text-white
            flex items-center justify-center
            rounded-r-full shadow-lg
            focus:outline-none
          "
        >
          ☰
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1  bg-white">
        <div className="mb-6 border-b pb-4 p-6">
          <p className="text-gray-600">Topbar</p>
        </div>
        <div className="pr-6 pl-6">
          <h1 className="text-xl font-bold text-gray-600">Counter</h1>
          <p className="my-2 text-gray-600">
            Current count: <strong>{count}</strong>
          </p>

          <div className="flex gap-4 text-gray-600">
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Peter;
