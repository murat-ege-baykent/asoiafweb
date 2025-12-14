import { Link } from 'react-router-dom';

const ItemCard = ({ title, subtitle, details = [], link }) => {
  return (
    <div className="bg-slate-800 rounded-xl border-2 border-slate-600 shadow-lg hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full mb-6">
      <div className="p-6 flex-grow">
        {/* Title Section - No line underneath, just clean text */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1 truncate" title={title}>
            {title || "Unknown"}
          </h3>
          {subtitle && (
            <p className="text-blue-400 text-sm font-medium italic">
              {subtitle}
            </p>
          )}
        </div>

        {/* Details List - CLEAN, no lines inside */}
        <div className="space-y-2 text-slate-300 text-sm">
          {details.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <span className="font-semibold text-slate-400 shrink-0 mr-2">{item.label}:</span>
              <span className="text-right text-slate-200 break-words">
                {item.value || "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {link && (
        <div className="p-4 bg-slate-900/50 border-t-2 border-slate-700 mt-auto">
          <Link 
            to={link} 
            className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemCard;