export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar, Navbar untuk dashboard */}
      <div className="flex">
        <aside className="w-64 bg-white border-r">
          {/* Sidebar content */}
          <nav className="p-4">
            <h2 className="font-bold mb-4">Dashboard</h2>
            {/* Menu items */}
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
