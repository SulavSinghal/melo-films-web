import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmsDetail';
import ContactPage from './pages/ContactUs';
import AboutUsPage from './pages/AboutsUs';
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
            <Route path="/aboutUs" element={<AboutUsPage />} /> 
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;