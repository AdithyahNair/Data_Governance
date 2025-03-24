import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
          <button
            onClick={logout}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}