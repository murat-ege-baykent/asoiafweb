import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-10">
      
      {/* Hero Section */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Welcome to Westeros
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Explore the vast world of <em>Game of Thrones</em> and <em>A Song of Ice and Fire</em>. 
          Dive into the detailed archives of characters, great houses, and the books that started it all.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        
        {/* Characters Card */}
        <Link to="/characters" className="group relative block p-8 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="text-4xl mb-4">👑</div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400">Characters</h2>
          <p className="text-slate-400">Browse through the thousands of characters from the Seven Kingdoms.</p>
        </Link>

        {/* Houses Card */}
        <Link to="/houses" className="group relative block p-8 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="text-4xl mb-4">🏰</div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400">Houses</h2>
          <p className="text-slate-400">Discover the noble houses, their sigils, words, and histories.</p>
        </Link>

        {/* Books Card */}
        <Link to="/books" className="group relative block p-8 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="text-4xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400">Books</h2>
          <p className="text-slate-400">View the collection of books written by George R.R. Martin.</p>
        </Link>

      </div>
    </div>
  );
};

export default Home;