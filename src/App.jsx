import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import CharacterDetail from './pages/CharacterDetail';
import HousesList from './pages/HousesList';
// Assuming you created this new file for the 3rd requirement
import BooksList from './pages/BooksList'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Listing Routes */}
            <Route path="/characters" element={<CharactersList />} />
            <Route path="/houses" element={<HousesList />} />
            <Route path="/books" element={<BooksList />} />

            {/* Detail Route */}
            {/* We use :id to capture the specific ID in the URL */}
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;