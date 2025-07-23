import React from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { Game } from "./data/games";
import { useGames } from "./hooks/useGames";
import { GameCard, PlayerModal, AdminModal } from "./components";

function App() {
  const [playerModalOpen, setPlayerModalOpen] = React.useState(false);
  const [adminModalOpen, setAdminModalOpen] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);
  const { games, loading, error } = useGames();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePlayerClick = (game: Game) => {
    setSelectedGame(game);
    setPlayerModalOpen(true);
  };

  const handleAdminClick = (game: Game) => {
    setSelectedGame(game);
    setAdminModalOpen(true);
  };

  const handleClosePlayerModal = () => {
    setPlayerModalOpen(false);
    setSelectedGame(null);
  };

  const handleCloseAdminModal = () => {
    setAdminModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      {/* Title */}
      <Box textAlign="center" mb={{ xs: 4, sm: 6 }}>
        <Typography
          variant={isMobile ? "h3" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "black",
            mb: 2,
            px: { xs: 1, sm: 0 },
          }}
        >
          WGBA Game Library
        </Typography>
      </Box>

      {/* Error State */}
      {error && (
        <Box mb={3}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress sx={{ color: "black" }} />
        </Box>
      )}

      {/* Games Grid */}
      {!loading && games.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fill, minmax(280px, 1fr))",
              md: "repeat(auto-fill, minmax(300px, 1fr))",
              lg: "repeat(auto-fill, minmax(320px, 1fr))",
            },
            gap: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 0 },
          }}
        >
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlayerClick={handlePlayerClick}
              onAdminClick={handleAdminClick}
            />
          ))}
        </Box>
      )}

      {/* No Games State */}
      {!loading && games.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No games found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check your Google Sheets configuration or try refreshing.
          </Typography>
        </Box>
      )}

      {/* Player Modal */}
      <PlayerModal
        open={playerModalOpen}
        onClose={handleClosePlayerModal}
        game={selectedGame}
      />

      {/* Admin Modal */}
      <AdminModal
        open={adminModalOpen}
        onClose={handleCloseAdminModal}
        game={selectedGame}
      />
    </Container>
  );
}

export default App;
