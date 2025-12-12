import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FamilyNode = ({ url, role }) => {
  const [name, setName] = useState('Loading...');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!url) {
      setName('Unknown');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setName(data.name || data.aliases[0] || "Unnamed");
        // Extract ID for the link
        const urlParts = url.split('/');
        setId(urlParts[urlParts.length - 1]);
      } catch (err) {
        setName('Error');
      }
    };

    fetchData();
  }, [url]);

  if (!url) return null;

  return (
    <div className="flex flex-col items-center mx-4 mb-4">
      <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">{role}</span>
      {id ? (
        <Link 
          to={`/characters/${id}`}
          className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow border border-slate-600 transition-colors text-sm font-semibold truncate max-w-[150px]"
        >
          {name}
        </Link>
      ) : (
        <span className="bg-slate-800 text-slate-500 px-4 py-2 rounded-lg border border-slate-700 text-sm">
          {name}
        </span>
      )}
    </div>
  );
};

const FamilyTree = ({ character }) => {
  // If no family data exists at all
  if (!character.father && !character.mother && !character.spouse && (!character.children || character.children.length === 0)) {
    return (
      <div className="bg-slate-800/50 p-6 rounded-lg text-center text-slate-400 italic">
        No family records found for this character.
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">Family Lineage</h2>
      
      <div className="flex flex-col items-center">
        
        {/* Level 1: Parents */}
        <div className="flex flex-wrap justify-center mb-8 relative">
          {character.father && <FamilyNode url={character.father} role="Father" />}
          {character.mother && <FamilyNode url={character.mother} role="Mother" />}
          
          {/* Connector Line (Visual only) */}
          {(character.father || character.mother) && (
            <div className="absolute -bottom-4 left-1/2 w-0.5 h-4 bg-slate-600 transform -translate-x-1/2"></div>
          )}
        </div>

        {/* Level 2: The Character & Spouse */}
        <div className="flex flex-wrap justify-center items-center mb-8 relative z-10">
          
          {/* The Current Character (Highlighted) */}
          <div className="flex flex-col items-center mx-4">
            <span className="text-xs text-blue-400 uppercase tracking-wider mb-1">Current</span>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg border-2 border-blue-400 font-bold text-lg">
              {character.name || "Unknown"}
            </div>
          </div>

          {/* Spouse */}
          {character.spouse && (
            <>
              <div className="text-slate-500 mx-2 text-2xl">♥</div>
              <FamilyNode url={character.spouse} role="Spouse" />
            </>
          )}
        </div>

        {/* Level 3: Children */}
        {character.children && character.children.length > 0 && (
           <div className="relative w-full flex flex-col items-center">
             {/* Connector Line from Parents to Children */}
             <div className="w-0.5 h-6 bg-slate-600 mb-4"></div>
             
             {/* Horizontal bar if multiple children */}
             {character.children.length > 1 && (
               <div className="w-1/2 h-0.5 bg-slate-600 mb-4"></div>
             )}

             <div className="flex flex-wrap justify-center gap-2">
               {character.children.map((childUrl, index) => (
                 <FamilyNode key={index} url={childUrl} role="Child" />
               ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default FamilyTree;