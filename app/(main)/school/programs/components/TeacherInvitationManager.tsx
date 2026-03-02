export default function TeacherInvitationManager() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Teacher Invitations</h2>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter teacher email"
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          placeholder="Number of Teachers Required"
          className="border p-3 rounded w-full"
        />

        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Send Invitation
        </button>
      </div>
    </div>
  );
}
