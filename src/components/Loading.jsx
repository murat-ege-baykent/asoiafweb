const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      {/* Tailwind Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-slate-400 text-lg animate-pulse">Loading data from Westeros...</p>
    </div>
  );
};

export default Loading;