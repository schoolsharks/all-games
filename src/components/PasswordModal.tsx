import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { Game } from "../data/games";

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  game: Game | null;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onClose,
  onSuccess,
  game,
}) => {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = () => {
    if (game && password === game.adminPasscode) {
      onSuccess();
      handleClose();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: "black" }}>
          Enter Password
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2, overflow: "visible" }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="black">
            Please enter the admin password for <strong>{game?.name}</strong> to
            view the PIN.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          autoFocus
          margin="dense"
          label="Admin Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter password to view PIN"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: "black",
            color: "black",
            "&:hover": {
              borderColor: "black",
              bgcolor: "grey.100",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!password.trim()}
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "grey.800",
            },
            "&:disabled": {
              bgcolor: "grey.400",
              color: "white",
            },
          }}
        >
          View PIN
        </Button>
      </DialogActions>
    </Dialog>
  );
};
