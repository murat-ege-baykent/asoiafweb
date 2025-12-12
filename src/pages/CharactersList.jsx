import { useState, useEffect } from 'react';
import { fetchCharacters, searchCharacters } from '../api';
import ItemCard from '../components/ItemCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Safe Helper to get ID
  const getIdFromUrl = (url) => {
    if (!url) return Math.random().toString();
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  // 2. The Data Loader
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let data;
        
        // Only use search API if there is actually a search term
        if (searchTerm && searchTerm.length > 0) {
            data = await searchCharacters(searchTerm, page, 12);
        } else {
            data = await fetchCharacters(page, 12);
        }

        // 3. Absolute Safety Check
        if (Array.isArray(data)) {
            setCharacters(data);
        } else {
            setCharacters([]); 
        }

      } catch (err) {
        console.error("Critical Fetch Error:", err);
        setCharacters([]); 
      } finally {
        setLoading(false);
      }
    };

    // Small delay to prevent crashing API while typing
    const timeoutId = setTimeout(() => {
      loadData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, searchTerm]);

  // 4. Handle Search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Always reset to page 1 when searching
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Characters</h1>

      {/* Search Input */}
      <SearchBar onSearch={handleSearch} placeholder="Search (e.g., Jon Snow)..." />
      
      {/* Loading & Content */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* If list is empty */}
          {characters.length === 0 ? (
             <div className="text-center py-10 bg-slate-800 rounded border border-slate-700">
               <p className="text-slate-300 text-lg">No characters found.</p>
               <p className="text-slate-500 text-sm mt-2">
                 If searching, remember to use exact full names (e.g., "Jon Snow").
               </p>
             </div>
          ) : (
             /* Grid of Items */
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {characters.map((char, index) => {
                 // --- FIX: We define 'id' here inside the loop ---
                 const id = getIdFromUrl(char.url); 
                 
                 return (
                   <ItemCard
                     key={`${id}-${index}`}
                     title={char.name || "Unknown"}
                     subtitle={char.culture ? `Culture: ${char.culture}` : "Unknown Culture"}
                     details={[
                        { label: "Gender", value: char.gender },
                        { label: "Born", value: char.born || "Unknown" },
                     ]}
                     // --- FIX: Now 'id' is defined and valid ---
                     link={`/characters/${id}`}
                   />
                 );
               })}
             </div>
          )}

          {/* Pagination (Only show buttons if we have data) */}
          {characters.length > 0 && (
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-slate-400">Page {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CharactersList;