import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// A single family member node
const FamilyNode = ({ url, role }) => {
  const [name, setName] = useState('Loading...');
  const [id, setId] = useState(null);

  useEffect(() => {
    // Safety check: if no URL, stop immediately
    if (!url) return;

    let isMounted = true; // Prevents memory leaks

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        
        if (isMounted) {
          setName(data.name || data.aliases[0] || "Unnamed");
          const parts = url.split('/');
          setId(parts[parts.length - 1]);
        }
      } catch (err) {
        if (isMounted) setName("Unknown");
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [url]);

  if (!url) return null;

  return (
    <div className="flex flex-col items-center mx-2 mb-4">
      <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">{role}</span>
      {id ? (
        <Link 
          to={`/characters/${id}`}
          className="bg-slate-700 hover:bg-blue-600 text-white px-3 py-2 rounded shadow border border-slate-600 text-sm font-semibold truncate max-w-[120px]"
        >
          {name}
        </Link>
      ) : (
        <span className="bg-slate-800 text-slate-500 px-3 py-2 rounded border border-slate-700 text-sm">
          {name}
        </span>
      )}
    </div>
  );
};

// The main tree container
const FamilyTree = ({ character }) => {
  // Guard clause: if character data is missing, show nothing
  if (!character) return null;

  const hasFamily = character.father || character.mother || character.spouse || (character.children && character.children.length > 0);

  if (!hasFamily) {
    return (
      <div className="text-center text-slate-500 italic mt-4">
        No family records found.
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Family Lineage</h2>
      
      <div className="flex flex-col items-center">
        {/* Parents */}
        <div className="flex flex-wrap justify-center mb-6">
          {character.father && <FamilyNode url={character.father} role="Father" />}
          {character.mother && <FamilyNode url={character.mother} role="Mother" />}
        </div>

        {/* Spouse */}
        {character.spouse && (
           <div className="mb-6 flex items-center">
             <span className="text-slate-500 mr-2 text-xl">♥</span>
             <FamilyNode url={character.spouse} role="Spouse" />
           </div>
        )}

        {/* Children */}
        {character.children && character.children.length > 0 && (
           <div className="w-full flex flex-col items-center border-t border-slate-700/50 pt-6">
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