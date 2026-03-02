export default function ConflictPanel() {
  return (
    <div className="bg-red-100 p-6 rounded-xl mt-6">
      <h3 className="font-bold text-red-700">Timetable Conflict Alert</h3>

      <ul className="text-sm mt-2 space-y-1 text-red-600">
        <li>• Grade 3 Mathematics already booked Tuesday 10:00</li>
        <li>• Teacher cannot be double booked</li>
        <li>• Break overlaps detected</li>
      </ul>
    </div>
  );
}
