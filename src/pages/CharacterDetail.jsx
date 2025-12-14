import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCharacterById } from '../api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FamilyTree from '../components/FamilyTree'; // Import the tree

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        setLoading(true);
        setCharacter(null); // Clear old data first
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError("Could not load character details.");
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!character) return <Error message="Character not found" />;

  const renderList = (items) => {
    if (!items || items.length === 0 || items[0] === "") return "None";
    return items.join(", ");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-slate-400 hover:text-white flex items-center transition-colors"
      >
        ← Back to List
      </button>

      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 border-b border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-2">
            {character.name || "Unknown Name"}
          </h1>
          {character.aliases && character.aliases[0] && (
            <p className="text-xl text-blue-400 italic">
              "{character.aliases[0]}"
            </p>
          )}
        </div>

        {/* Details Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2 mb-4">
              Personal Info
            </h2>
            <DetailRow label="Gender" value={character.gender} />
            <DetailRow label="Culture" value={character.culture} />
            <DetailRow label="Born" value={character.born} />
            <DetailRow label="Died" value={character.died} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2 mb-4">
              Titles & Affiliations
            </h2>
            <DetailRow label="Titles" value={renderList(character.titles)} />
            <DetailRow label="Aliases" value={renderList(character.aliases)} />
            <div className="pt-4 mt-4 border-t border-slate-700/50">
               <DetailRow label="Played By" value={renderList(character.playedBy)} />
            </div>
          </div>
        </div>

        {/* --- FAMILY TREE (Safe Mode) --- */}
        <div className="p-8 bg-slate-900/50 border-t border-slate-700">
           <FamilyTree character={character} />
        </div>
        {/* ------------------------------- */}

      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between">
    <span className="text-slate-400 font-medium">{label}:</span>
    <span className="text-slate-200 sm:text-right font-light">
      {value || "Unknown"}
    </span>
  </div>
);

export default CharacterDetail;