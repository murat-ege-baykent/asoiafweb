const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  // We handle the input change directly to allow for real-time searching
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-8 max-w-lg mx-auto">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        {/* Input Field */}
        <input 
          type="text" 
          className="block w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm" 
          placeholder={placeholder} 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
};

export default SearchBar;