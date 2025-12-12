const Footer = () => {
  return (
    <footer className="bg-slate-800 py-6 mt-auto border-t border-slate-700">
      <div className="container mx-auto text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Game of Thrones Wiki.</p>
        <p className="mt-1">
          Data provided by <a href="https://anapioficeandfire.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">An API of Ice And Fire</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;