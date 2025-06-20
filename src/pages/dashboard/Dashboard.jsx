import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import { FiFilm, FiClock, FiCheckCircle } from 'react-icons/fi';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, upcoming: 0, produced: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/films/stats/summary`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-yellow-400 text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="text-white px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading stats...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Films"
              value={stats.total}
              icon={<FiFilm />}
              color="text-blue-400"
            />
            <StatCard
              title="Upcoming Films"
              value={stats.upcoming}
              icon={<FiClock />}
              color="text-yellow-400"
            />
            <StatCard
              title="Produced Films"
              value={stats.produced}
              icon={<FiCheckCircle />}
              color="text-green-400"
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
