import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define a more specific type for the item, assuming you are working with Pokémon objects
interface Item {
  name: string;
  url: string;
}

// Define the shape of the context value
interface FavoritesContextType {
  favorites: Item[];
  addToFavorites: (item: Item) => void;
  removeFromFavorites: (item: Item) => void;
}

// Create the context with a default value (can be `undefined` initially)
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Load favorites from localStorage on initial load
  const [favorites, setFavorites] = useState<Item[]>(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Add a new item to the favorites list (if it's not already in the list)
  const addToFavorites = (item: Item) => {
    if (!favorites.some((fav) => fav.name === item.name)) {
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
  };

  // Remove an item from the favorites list
  const removeFromFavorites = (item: Item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.name !== item.name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the context
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
