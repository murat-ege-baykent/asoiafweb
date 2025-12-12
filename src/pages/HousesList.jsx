import { useState, useEffect } from 'react';
import { fetchHouses } from '../api';
import ItemCard from '../components/ItemCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

const HousesList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHouses(page, 12);
        setHouses(data);
      } catch (err) {
        setError("Failed to load houses.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  if (error) return <Error message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Great Houses</h1>
        <span className="text-slate-400 text-sm">Page {page}</span>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house, index) => (
              <ItemCard
                key={index} // API doesn't always provide unique IDs easily for houses in list view, using index is safe here
                title={house.name}
                subtitle={house.region ? `Region: ${house.region}` : "Unknown Region"}
                details={[
                  { label: "Words", value: house.words || "None" },
                  { label: "Coat of Arms", value: house.coatOfArms || "None" },
                  { label: "Founded", value: house.founded || "Unknown" }
                ]}
                // No link provided here since we focused detail view on Characters
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded bg-slate-700 text-white font-semibold transition ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-blue-600 font-semibold transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HousesList;