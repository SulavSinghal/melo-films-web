import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../dashboard/DashboardLayout';
import { 
  FiMail, FiUser, FiMessageCircle, FiTag, 
  FiAlertTriangle, FiInbox, FiTrash2, FiCheckCircle 
} from 'react-icons/fi';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/contact`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const sorted = sortMessages(res.data, sortBy);
        setMessages(sorted);
        setError(null);
      } catch (err) {
        console.error("Fetch messages error:", err);
        setError('Failed to load messages. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [sortBy]);

  const sortMessages = (data, criteria) => {
    switch (criteria) {
      case 'latest':
        return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'unread':
        return [...data].filter((msg) => !msg.read);
      default:
        return data;
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await axios.patch(`${API_BASE}/api/contact/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessages(messages.map((msg) => (msg._id === id ? res.data : msg)));
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  const StateDisplay = ({ icon, title, message }) => (
    <div className="text-center py-20 px-6 bg-gray-800 rounded-lg">
      <div className="text-gray-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="text-white px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold">Contact Messages</h2>
          <div>
            <label className="text-sm font-medium mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 px-3 py-1 rounded"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="unread">Unread</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {loading ? (
            <StateDisplay 
              icon={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>}
              title="Loading Messages"
              message="Fetching the latest inquiries from the server..."
            />
          ) : error ? (
            <StateDisplay 
              icon={<FiAlertTriangle size={48} className="mx-auto" />}
              title="Error"
              message={error}
            />
          ) : messages.length === 0 ? (
            <StateDisplay 
              icon={<FiInbox size={48} className="mx-auto" />}
              title="No Messages"
              message="Your inbox is currently empty."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm sm:text-base">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider">Inquiry</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {messages.map((msg) => (
                    <tr key={msg._id} className="hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FiUser className="text-gray-400" />
                          <span className="font-medium">{msg.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FiMail className="text-gray-400" />
                          <span className="break-all">{msg.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FiTag className="text-gray-400" />
                          <span className="capitalize">{msg.inquiryType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-lg">
                        <div className="flex items-start gap-3">
                          <FiMessageCircle className="text-gray-400 flex-shrink-0 mt-1" />
                          <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          {!msg.read && (
                            <button
                              onClick={() => markAsRead(msg._id)}
                              title="Mark as Read"
                              className="text-green-400 hover:text-green-600"
                            >
                              <FiCheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            title="Delete Message"
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
