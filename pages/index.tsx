import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ListItem';
import { useRouter } from 'next/router';
import { downloadCSV } from '../utils/csvUtils';
import { FaDownload } from 'react-icons/fa'; 

const fetchItems = async (page: number) => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon', {
    params: {
      limit: 20,
      offset: page * 20,
    },
  });
  return res.data.results;
};

const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchItems(page);
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  };

  return (
    <div className="browse-container">
      <h1>Browse Pokémon</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="show-favorites-btn">
        <button onClick={() => router.push('/favorites')} className="btn">
          Show Favorites
        </button>
      </div>

      <div className="download-btn-container">
        <button onClick={() => downloadCSV(filteredItems)} className="download-csv-btn">
          <FaDownload size={16} style={{ marginRight: '8px' }} />
          <span>Download CSV</span>
        </button>
      </div>

      {isLoading && <p className="loading-text">Loading...</p>}
      {isError && <p className="error-text">Error fetching data!</p>}
      {!isLoading && !isError && filteredItems.length === 0 && (
        <p className="no-results-text">No results found.</p>
      )}

      <ItemList items={filteredItems} />

      {filteredItems.length > 0 && !isLoading && !isError && (
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={isLoading}
          className="load-more-btn"
        >
          {isLoading ? 'Loading more...' : 'Load More'}
        </button>
      )}

      <style jsx>{`
        .browse-container {
          padding: 20px;
          text-align: center;
          position: relative;
        }

        .loading-text, .error-text, .no-results-text {
          font-size: 1.2rem;
          margin-top: 20px;
          color: #555;
        }

        .load-more-btn {
          margin-top: 30px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .load-more-btn:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }

        .load-more-btn:hover {
          background-color: #005bb5;
        }

        .load-more-btn:active {
          background-color: #004080;
        }

        .download-btn-container {
          position: absolute;
          bottom: 30px;
          right: 20px;
        }

        .download-csv-btn {
          padding: 8px 15px;
          background-color: #28a745;
          color: white;
          font-size: 14px; /* Reduced font size */
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .download-csv-btn:hover {
          background-color: #218838;
        }

        .show-favorites-btn {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .btn {
          padding: 10px 20px;
          background-color: #ff6f61;
          color: white;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: #e04e42;
        }
      `}</style>
    </div>
  );
};

export default BrowsePage;
