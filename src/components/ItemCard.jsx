import { Link } from 'react-router-dom';

const ItemCard = ({ title, subtitle, details = [], link }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-md hover:shadow-xl hover:bg-slate-750 transition-all duration-300 overflow-hidden border border-slate-700 flex flex-col h-full">
      <div className="p-5 flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1 truncate" title={title}>
          {title || "Unknown"}
        </h3>

        {/* Subtitle (e.g., Character alias, Book author) */}
        {subtitle && (
          <p className="text-blue-400 text-sm mb-4 font-medium italic">
            {subtitle}
          </p>
        )}

        {/* Extra Details List */}
        <div className="space-y-2 text-slate-300 text-sm">
          {details.map((item, index) => (
            <div key={index} className="flex justify-between border-b border-slate-700 pb-1 last:border-0">
              <span className="font-semibold text-slate-400">{item.label}:</span>
              <span className="text-right truncate max-w-[60%]">{item.value || "N/A"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {link && (
        <div className="p-4 bg-slate-900/50 border-t border-slate-700 mt-auto">
          <Link 
            to={link} 
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemCard;