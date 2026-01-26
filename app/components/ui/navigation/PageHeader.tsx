"use client";

type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-extrabold text-gray-900 mb-0.5 leading-tight">
        {title}
      </h1>
      <p className="text-xs text-gray-600 leading-snug">{description}</p>
    </div>
  );
}
