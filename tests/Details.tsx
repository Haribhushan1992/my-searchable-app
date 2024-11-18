import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DetailsPage from '../pages/details/[id]';
import { FavoritesProvider } from '../context/FavoritesContext';
import { useRouter } from 'next/router'; // Import Next.js useRouter hook

// Mock useRouter from next/router for routing handling in the test
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DetailsPage', () => {
  it('toggles favorite on button click', async () => {
    const mockPush = jest.fn();
    
    // Mock implementation of useRouter with correct typing
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { id: '1' },
      push: mockPush,
    }));

    render(
      <FavoritesProvider>
        <DetailsPage itemData={{ name: 'Pikachu', abilities: [] }} />
      </FavoritesProvider>
    );

    // Initially, the button should say "Add to Favorites"
    const button = screen.getByText('Add to Favorites');
    expect(button).toBeInTheDocument();

    // Click the button to add the item to favorites
    fireEvent.click(button);

    // After clicking, the button should say "Remove from Favorites"
    await waitFor(() => {
      expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
    });

    // Click the button again to remove from favorites
    fireEvent.click(screen.getByText('Remove from Favorites'));

    // After clicking again, the button should go back to "Add to Favorites"
    await waitFor(() => {
      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });
  });
});
