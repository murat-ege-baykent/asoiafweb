import { useState, useEffect } from 'react';
import { fetchBooks } from '../api';
import ItemCard from '../components/ItemCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetching page 1 with size 20 covers all main books
        const data = await fetchBooks(1, 20);
        setBooks(data);
      } catch (err) {
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (error) return <Error message={error} />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Published Books</h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => {
            // Format date nicely
            const date = new Date(book.released).toLocaleDateString();
            
            return (
              <ItemCard
                key={index}
                title={book.name}
                subtitle={`by ${book.authors.join(', ')}`}
                details={[
                  { label: "Publisher", value: book.publisher },
                  { label: "Released", value: date },
                  { label: "Pages", value: book.numberOfPages }
                ]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BooksList;