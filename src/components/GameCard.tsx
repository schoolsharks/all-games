import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AdminPanelSettings, Person } from "@mui/icons-material";
import type { Game } from "../data/games";

interface GameCardProps {
  game: Game;
  onPlayerClick: (game: Game) => void;
  onAdminClick: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onPlayerClick,
  onAdminClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          textAlign: "center",
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h3"
          gutterBottom
          sx={{
            fontWeight: "medium",
            wordBreak: "break-word",
            hyphens: "auto",
            color: "black",
          }}
        >
          {game.name}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Person />}
          onClick={() => onPlayerClick(game)}
          sx={{
            minWidth: { xs: "100%", sm: 120 },
            mb: { xs: 1, sm: 0 },
            mr: { xs: 0, sm: game.adminLink ? 1 : 0 }, // Only add margin if admin button exists
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "grey.800",
            },
          }}
          size={isMobile ? "medium" : "medium"}
        >
          Player
        </Button>

        {/* Only show admin button if admin link exists */}
        {game.adminLink && (
          <Button
            variant="outlined"
            startIcon={<AdminPanelSettings />}
            onClick={() => onAdminClick(game)}
            sx={{
              minWidth: { xs: "100%", sm: 120 },
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                bgcolor: "grey.100",
              },
            }}
            size={isMobile ? "medium" : "medium"}
          >
            Admin
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
