export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold">Rp 10,000,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Orders Today</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Active Tenants</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </div>
  );
}
