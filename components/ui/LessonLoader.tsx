export function LessonLoader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <p className="text-sm text-gray-500 animate-pulse">
        Waiting for lesson to start…
      </p>
    </div>
  );
}
