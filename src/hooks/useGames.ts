import { useState, useEffect } from 'react';
import type { Game } from '../data/games';
import { fetchGamesFromSheets } from '../services/googleSheetsService';

interface UseGamesReturn {
  games: Game[];
  loading: boolean;
  error: string | null;
  refreshGames: () => Promise<void>;
}

export const useGames = (): UseGamesReturn => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const gamesData = await fetchGamesFromSheets();
      setGames(gamesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch games');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshGames = async () => {
    await fetchGames();
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    loading,
    error,
    refreshGames,
  };
};
