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
import { Close, ContentCopy, Download, Launch } from "@mui/icons-material";
import QRCode from "react-qr-code";
import type { Game } from "../data/games";
import { copyToClipboard, downloadQRCode } from "../utils/helpers";

interface PlayerModalProps {
  open: boolean;
  onClose: () => void;
  game: Game | null;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  open,
  onClose,
  game,
}) => {
  const [copySuccess, setCopySuccess] = React.useState(false);

  const handleCopyLink = async () => {
    if (game) {
      const success = await copyToClipboard(game.playerLink);
      if (success) {
        setCopySuccess(true);
      }
    }
  };

  const handleDownloadQR = () => {
    if (game) {
      downloadQRCode(game.name);
    }
  };

  const handleVisitLink = () => {
    if (game) {
      window.open(game.playerLink, "_blank");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
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
          <Typography variant="h6" component="h2">
            {game?.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", py: 2, overflow: "visible" }}>
          {game && (
            <Box>
              {/* QR Code */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  p: 1,
                  bgcolor: "white",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "black",
                }}
              >
                <QRCode
                  id={`qr-code-${game.name}`}
                  value={game.playerLink}
                  size={150}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox="0 0 256 256"
                />
              </Box>

              {/* Download QR Button */}
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleDownloadQR}
                sx={{
                  mb: 2,
                  minWidth: 160,
                  borderColor: "black",
                  color: "black",
                  "&:hover": {
                    borderColor: "black",
                    bgcolor: "grey.100",
                  },
                }}
              >
                Download QR Code
              </Button>

              {/* Game Link */}
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
                  {game.playerLink}
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
                    onClick={handleVisitLink}
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
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
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
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};
