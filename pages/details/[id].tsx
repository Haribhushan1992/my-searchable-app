import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FavoritesContext } from '../../context/FavoritesContext';
import axios from 'axios';

// Fetch item details from the API
const fetchItemDetails = async (id: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data;
};

const DetailsPage = ({ itemData }:any) => {
  const router = useRouter();
  const { id } = router.query;

  
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext)!;

  
  const [isFavorite, setIsFavorite] = useState(
    favorites?.some((fav: any) => fav.name === itemData.name) || false
  );

  useEffect(() => {
    if (favorites) {
      setIsFavorite(favorites.some((fav: any) => fav.name === itemData.name));
    }
  }, [favorites, itemData.name]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(itemData);
    } else {
      addToFavorites(itemData);
    }
    setIsFavorite(!isFavorite);
  };

  const goHome = () => {
    router.push('/');  // Navigate back to the homepage
  };

  if (!itemData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <h1 className="title">{itemData.name}</h1>
      
      {/* Favorite button */}
      <button onClick={toggleFavorite} className="favorite-button">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      {/* Item details */}
      <div className="item-details">
        <p>Details: {itemData.abilities && itemData.abilities.map((ability: { ability: { name: any; }; }) => ability.ability.name).join(', ')}</p>
      </div>

      {/* Back to Home button */}
      <button onClick={goHome} className="back-home-button">Back to Home</button>

      <style jsx>{`
        .details-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          max-width: 600px;
          margin: 20px auto;
          text-align: center;
        }

        .title {
          font-size: 2rem;
          color: #333;
          margin-bottom: 20px;
        }

        .favorite-button {
          background-color: #ff4d4d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
          margin: 10px;
        }

        .favorite-button:hover {
          background-color: #e43f3f;
        }

        .item-details {
          font-size: 1.1rem;
          color: #666;
          margin: 15px 0;
        }

        .back-home-button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .back-home-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

// Fetch item data on the server side (SSR)
export async function getServerSideProps(context: { params: { id: any; }; }) {
  const { id } = context.params;
  const itemData = await fetchItemDetails(id);

  return {
    props: { itemData }, // Pass the fetched data as a prop
  };
}

export default DetailsPage;
