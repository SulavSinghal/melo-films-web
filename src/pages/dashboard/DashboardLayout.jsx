import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };    

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Films', path: '/admin/dashboard/films' },
    { name: 'Contacts', path: '/admin/dashboard/contacts' },
  ];

  return (
    <div className="flex min-h-screen text-white bg-[#0f0f0f]">
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-black p-4 transition-all duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold text-yellow-500 ${collapsed ? 'hidden' : ''}`}>Admin</h2>
          <button onClick={() => setCollapsed(!collapsed)} className="text-white">
            <FaBars />
          </button>
        </div>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="block hover:text-yellow-500 text-sm"
              >
                {collapsed ? link.name.charAt(0) : link.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-10 text-red-500 hover:text-red-400 text-sm w-full text-left"
        >
          {collapsed ? '⎋' : 'Logout'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
