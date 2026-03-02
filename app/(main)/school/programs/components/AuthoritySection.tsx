export default function AuthoritySection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Programme Creation Authority
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <RoleCard
          title="Super Admin"
          description="Platform-wide global programmes"
          canSetPrice="Yes"
          approval="Not required"
        />
        <RoleCard
          title="School Admin"
          description="School-specific programmes"
          canSetPrice="Yes"
          approval="Requires Sqooli Approval"
        />
        <RoleCard
          title="Lead Digital Teacher"
          description="Digital academy programmes"
          canSetPrice="Optional"
          approval="Requires Sqooli Approval"
        />
      </div>
    </div>
  );
}

function RoleCard({ title, description, canSetPrice, approval }: any) {
  return (
    <div className="border p-6 rounded-xl hover:shadow">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
      <div className="text-xs mt-4 space-y-1">
        <p>
          <strong>Price Control:</strong> {canSetPrice}
        </p>
        <p>
          <strong>Approval:</strong> {approval}
        </p>
      </div>
    </div>
  );
}
