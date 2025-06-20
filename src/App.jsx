import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmsDetail';
import ContactPage from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Dashboard';
 import AdminFilms from './pages/dashboard/Films';
import ProtectedRoute from './components/ProtectedRoute';
 import ContactsUs from './pages/dashboard/Contacts';
// import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/films/:id" element={<FilmDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />


            <Route element ={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Overview />} />
            <Route path="/admin/dashboard" element={<DashboardLayout />} />
            <Route path="/admin/dashboard/films" element={<AdminFilms />} />
            <Route path="/admin/dashboard/contacts" element={<ContactsUs />} />
            </Route>

            {/* <Route path="settings" element={<Settings />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;