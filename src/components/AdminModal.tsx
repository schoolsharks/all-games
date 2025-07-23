import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close, ContentCopy, Visibility, Launch } from "@mui/icons-material";
import type { Game } from "../data/games";
import { copyToClipboard } from "../utils/helpers";
import { PasswordModal } from "./PasswordModal";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  game: Game | null;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  open,
  onClose,
  game,
}) => {
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [showPin, setShowPin] = React.useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);

  const handleCopyLink = async () => {
    if (game) {
      const success = await copyToClipboard(game.adminLink);
      if (success) {
        setCopySuccess(true);
      }
    }
  };

  const handleViewPin = () => {
    setPasswordModalOpen(true);
  };

  const handleVisitAdminLink = () => {
    if (game) {
      window.open(game.adminLink, "_blank");
    }
  };

  const handlePasswordSuccess = () => {
    setShowPin(true);
    setPasswordModalOpen(false);
  };

  const handleClose = () => {
    setShowPin(false);
    setPasswordModalOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
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
          }}
        >
          <Typography variant="h6" component="h2">
            Admin Access - {game?.name}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 2, overflow: "visible" }}>
          {game && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* PIN Section */}
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "black" }}
                >
                  Admin PIN
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "black",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      flexGrow: 1,
                      fontFamily: "monospace",
                      letterSpacing: 2,
                      color: showPin ? "black" : "transparent",
                      textShadow: showPin ? "none" : "0 0 8px rgba(0,0,0,0.5)",
                      backgroundColor: showPin ? "transparent" : "grey.300",
                      borderRadius: showPin ? 0 : 1,
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    {showPin ? game.adminPin : "••••"}
                  </Typography>
                  <IconButton
                    onClick={handleViewPin}
                    size="small"
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      "&:hover": {
                        bgcolor: "grey.800",
                      },
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Box>
                {!showPin && (
                  <Typography
                    variant="caption"
                    color="text.primary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Click the eye icon to view the PIN (password required)
                  </Typography>
                )}
              </Box>

              {/* Admin Link Section */}
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "black" }}
                >
                  Admin Link
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "black",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: "break-all",
                      textAlign: "left",
                      color: "black",
                    }}
                  >
                    {game.adminLink}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={handleCopyLink}
                      sx={{
                        bgcolor: "black",
                        color: "white",
                        "&:hover": {
                          bgcolor: "grey.800",
                        },
                        flex: 1,
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Launch />}
                      onClick={handleVisitAdminLink}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          borderColor: "black",
                          bgcolor: "grey.100",
                        },
                        flex: 1,
                      }}
                    >
                      Visit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
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
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Modal */}
      <PasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
        game={game}
      />

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopySuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Admin link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};
