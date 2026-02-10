"use client";

import Link from "next/link";
import { Layers } from "lucide-react";

type GeneralBreadcrumbItem = {
  label: string;
  href?: string;
};

type GeneralBreadcrumbProps = {
  items: GeneralBreadcrumbItem[];
};

export default function GeneralBreadcrumb({ items }: GeneralBreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-2 text-xs text-gray-600 select-none">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center gap-2">
              {index === 0 && <Layers className="w-3 h-3" />}

              {index > 0 && <span>›</span>}

              {isLast || !item.href ? (
                <span className="text-blue-600 font-semibold">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
