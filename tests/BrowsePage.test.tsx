import { render, screen, waitFor } from '@testing-library/react';
import BrowsePage from '../pages/index'; // Import the page component
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';


beforeEach(() => {
  fetchMock.resetMocks();  // Reset fetch mocks before each test
});

test('should fetch and display Pokémon data', async () => {
  // Mock the API response
  fetchMock.mockResponseOnce(
    JSON.stringify({
      results: [{ name: 'pikachu' }]
    })
  );

  render(<BrowsePage />);  // Render the component

  // Wait for the data to load and verify it shows up
  await waitFor(() => screen.getByText('pikachu'));

  // Check if the name 'pikachu' is rendered in the document
  expect(screen.getByText('pikachu')).toBeInTheDocument();
});
