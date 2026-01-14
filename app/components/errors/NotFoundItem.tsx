import React from "react";
import { useRouter } from "next/navigation";

interface NotFoundItemProps {
  title: string;
  description: string;
  link: string;
}

const NotFoundItem = (item: NotFoundItemProps) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mb-8 flex justify-center relative">
          <svg
            width="200"
            height="160"
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sparkles */}
            <g opacity="0.4">
              <path d="M220 50 L222 52 L220 54 L218 52 Z" fill="#9CA3AF" />
              <path d="M250 45 L252 47 L250 49 L248 47 Z" fill="#9CA3AF" />
              <path d="M322 50 L324 52 L322 54 L320 52 Z" fill="#9CA3AF" />
              <path d="M200 155 L202 157 L200 159 L198 157 Z" fill="#9CA3AF" />
            </g>

            {/* Folder */}
            <g transform="translate(30, 20)">
              <rect
                x="0"
                y="25"
                width="100"
                height="70"
                rx="4"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              <path
                d="M0 25 L0 20 C0 17.7909 1.79086 16 4 16 L30 16 L35 25 L100 25"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="2"
              />

              {/* Document inside folder */}
              <g transform="translate(15, 10)">
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="50"
                  rx="2"
                  fill="white"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  transform="rotate(-15 20 25)"
                />
                <line
                  x1="8"
                  y1="15"
                  x2="32"
                  y2="15"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  transform="rotate(-15 20 25)"
                />
                <line
                  x1="8"
                  y1="22"
                  x2="32"
                  y2="22"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  transform="rotate(-15 20 25)"
                />
                <line
                  x1="8"
                  y1="29"
                  x2="25"
                  y2="29"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  transform="rotate(-15 20 25)"
                />
              </g>
            </g>

            {/* Magnifying Glass */}
            <g transform="translate(110, 70)">
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="white"
                stroke="#9CA3AF"
                strokeWidth="3"
              />
              <circle
                cx="25"
                cy="25"
                r="18"
                fill="#F3F4F6"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="40"
                x2="55"
                y2="55"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* Text Content */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push(item.link)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-md transition-colors shadow-sm"
        >
          Start Setup
        </button>
      </div>
    </div>
  );
};

export default NotFoundItem;
