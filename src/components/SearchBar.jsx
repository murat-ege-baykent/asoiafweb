const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-6 max-w-md mx-auto">
      <div className="relative">
        {/* ICON CONTAINER */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* HARDCODED SIZE STYLE to force it to be small */}
          <svg 
            aria-hidden="true" 
            className="text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ width: '16px', height: '16px' }} 
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        
        
        {/* COMPACT INPUT FIELD */}
        <input 
          type="text" 
          className="block w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-600 rounded text-sm text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" 
          placeholder={placeholder} 
          onChange={handleInputChange} 
        />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;