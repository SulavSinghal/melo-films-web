import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../dashboard/DashboardLayout';
import { FiPlus, FiEdit, FiTrash2, FiAlertCircle } from 'react-icons/fi';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFilm, setNewFilm] = useState({
    film_name: '',
    film_genre: '',
    film_year: '',
    film_description: '',
    film_type: '',
    film_banner: null,
    film_images: [],
  });
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [deleteSuccessId, setDeleteSuccessId] = useState(null);
  const [editingFilmId, setEditingFilmId] = useState(null);

  const filmsContainerRef = useRef(null);
  const navigate = useNavigate();

  const fetchFilms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/api/films`);
      setFilms(response.data);
    } catch (error) {
      console.error('Error fetching films:', error);
      setError('Failed to load films. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteFilm = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/films/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFilms(films.filter((film) => film._id !== id));
      setDeleteSuccessId(id);
      setTimeout(() => setDeleteSuccessId(null), 3000);
    } catch (error) {
      console.error('Error deleting film:', error);
      setError('Failed to delete film. Please try again.');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newFilm.film_name.trim()) errors.film_name = 'Film name is required.';
    if (!newFilm.film_genre.trim()) errors.film_genre = 'Genre is required.';
    if (!newFilm.film_year) errors.film_year = 'Year is required.';
    if (newFilm.film_year && (newFilm.film_year < 1888 || newFilm.film_year > new Date().getFullYear() + 5)) {
        errors.film_year = 'Please enter a valid year.';
    }
    if (!newFilm.film_description.trim()) errors.film_description = 'Description is required.';
    if (!newFilm.film_type) errors.film_type = 'Please select a film type.';
    if (!newFilm.film_banner && !editingFilmId) errors.film_banner = 'A banner image is required.';
    if (newFilm.film_images.length === 0 && !editingFilmId) errors.film_images = 'At least one other image is required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('film_name', newFilm.film_name);
    formData.append('film_genre', newFilm.film_genre);
    formData.append('film_year', newFilm.film_year);
    formData.append('film_description', newFilm.film_description);
    formData.append('film_type', newFilm.film_type);
    if (newFilm.film_banner) formData.append('film_banner', newFilm.film_banner);
    for (let img of newFilm.film_images) {
      formData.append('film_images', img);
    }

    try {
      setError(null);
      let response;

      if (editingFilmId) {
        response = await axios.put(`${API_BASE}/api/films/${editingFilmId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        await fetchFilms();
      } else {
        response = await axios.post(`${API_BASE}/api/films`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        await fetchFilms();
      }

      setNewFilm({
        film_name: '', film_genre: '', film_year: '', film_description: '',
        film_type: '', film_banner: null, film_images: [],
      });

      setShowAddForm(false);
      setEditingFilmId(null);
    } catch (err) {
      console.error('Failed to add/update film', err);
      setError(err.response?.data?.message || 'Failed to process request.');
    }
  };

  const handleEditFilm = (film) => {
    setNewFilm({
      film_name: film.film_name,
      film_genre: film.film_genre,
      film_year: film.film_year,
      film_description: film.film_description,
      film_type: film.film_type,
      film_banner: null,
      film_images: [],
    });
    setEditingFilmId(film._id);
    setShowAddForm(true);
  }

  const handleCloseModal = () => {
    setShowAddForm(false);
    setError(null);
    setFormErrors({});
    setEditingFilmId(null);
    setTimeout(() => {
      filmsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    if (!showAddForm) {
      setError(null);
      setFormErrors({});
    }
  }, [showAddForm]);

  return (
    <DashboardLayout>
      <div ref={filmsContainerRef}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Films</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            <FiPlus /> Add New Film
          </button>
        </div>

        {error && !showAddForm && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-4 flex items-center gap-3">
            <FiAlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <p>Loading films...</p>
        ) : (
          <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
            <table className="min-w-full text-left border-collapse">
              <thead className="border-b border-gray-700">
                <tr className="bg-gray-700/50">
                  <th className="p-4">Banner</th>
                  <th className="p-4">Name</th>
                  <th className="p-4 hidden sm:table-cell">Genre</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {films.map((film) => (
                  <tr key={film._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="p-2 sm:p-4">
                      <img
                        src={`${API_BASE}/${film.film_banner.replace(/\\/g, '/')}`}
                        alt={film.film_name}
                        className="h-16 w-24 object-cover rounded shadow-md"
                      />
                    </td>
                    <td className="p-2 sm:p-4 font-medium">{film.film_name}</td>
                    <td className="p-2 sm:p-4 hidden sm:table-cell">{film.film_genre}</td>
                    <td className="p-2 sm:p-4 space-x-2">
                      <button
                        onClick={() => handleEditFilm(film)}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteFilm(film._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all transform hover:scale-110"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="absolute inset-0 bg-black bg-opacity-70" onClick={handleCloseModal}></div>
            <div
              className="relative bg-white text-black p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleAddSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Film Name</label>
                  <input
                    type="text"
                    value={newFilm.film_name}
                    onChange={(e) => setNewFilm({ ...newFilm, film_name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Genre</label>
                  <input
                    type="text"
                    value={newFilm.film_genre}
                    onChange={(e) => setNewFilm({ ...newFilm, film_genre: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={newFilm.film_year}
                    onChange={(e) => setNewFilm({ ...newFilm, film_year: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    value={newFilm.film_description}
                    onChange={(e) => setNewFilm({ ...newFilm, film_description: e.target.value })}
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Type</label>
                  <select
                    value={newFilm.film_type}
                    onChange={(e) => setNewFilm({ ...newFilm, film_type: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Type</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="production">Production</option>
                  </select>
                </div>
              <div className="mb-4">
                  <label className="block font-semibold mb-1">Banner Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewFilm({ ...newFilm, film_banner: e.target.files[0] })}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                  </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Other Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*" 
                    onChange={(e) => setNewFilm({ ...newFilm, film_images: Array.from(e.target.files) })}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-black px-4 py-2 rounded"
                  >
                    {editingFilmId ? 'Update' : 'Add'} Film
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
