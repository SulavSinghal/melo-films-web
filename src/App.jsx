import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmsDetail';
import AdminLogin from './pages/AdminLogin';
import DashboardLayout from './pages/dashboard/DashboardLayout';
// import Overview from './pages/dashboard/Overview';
 import AdminFilms from './pages/dashboard/Films';
// import Contacts from './pages/dashboard/Contacts';
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
            <Route path="/films/:id" element={<FilmDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<DashboardLayout />} />
            {/* <Route index element={<Overview />} /> */}
            { <Route path="/admin/dashboard/films" element={<AdminFilms />} /> }
            {/* <Route path="contacts" element={<Contacts />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;