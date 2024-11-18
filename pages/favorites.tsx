import { useFavorites } from '../context/FavoritesContext'; // Custom hook for accessing favorites
import { useRouter } from 'next/router'; // For programmatic navigation

const FavoritesPage = () => {
  const { favorites } = useFavorites(); // Access favorites from context
  const router = useRouter(); // Use Next.js router for navigation

  // If there are no favorites, show a message
  if (favorites.length === 0) {
    return <p>No favorites yet. Start adding some Pokémon to your favorites!</p>;
  }

  // Function to navigate to the details page
  const handleNavigateToDetails = (name: string) => {
    router.push(`/details/${name}`);
  };

  return (
    <div>
      <h1>Your Favorite Pokémon</h1>
      <div className="favorite-list">
        {favorites.map((item) => (
          <div
            key={item.name}
            className="favorite-item"
            onClick={() => handleNavigateToDetails(item.name)} // Trigger navigation
          >
            {item.name}
          </div>
        ))}
      </div>

      <style jsx>{`
        .favorite-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .favorite-item {
          background-color: #f0f0f0;
          padding: 15px;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .favorite-item:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default FavoritesPage;
