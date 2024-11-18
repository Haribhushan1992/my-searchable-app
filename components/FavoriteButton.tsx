import { useContext, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

interface FavoriteButtonProps {
  itemData: any; 
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ itemData }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext)!;
  
 
  const [isFavorite, setIsFavorite] = useState(favorites.some(fav => fav.name === itemData.name));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(itemData);
    } else {
      addToFavorites(itemData);
    }
    setIsFavorite(!isFavorite); // Toggle the state
  };

  return (
    <button onClick={toggleFavorite} className="favorite-button">
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
