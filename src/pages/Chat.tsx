import { Box, Button, Container, Grid, TextField, Typography, IconButton, InputAdornment, Popover, Avatar } from "@mui/material";
import GifIcon from "@mui/icons-material/Gif";
import { Link, useParams } from "react-router-dom";
import DrawBox from "../components/DrawBox";
import GifPicker from "../components/GifPicker";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Person } from "@mui/icons-material";
import Logo from "../components/Logo";
import { useEffect, useRef, useState } from "react";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ROOM_MESSAGES,
  SEND_MESSAGE,
  type RoomMessagesResponse,
  type RoomMessagesVars,
  type SendMessageResponse,
  type SendMessageVars,
  type MessageItem,
} from "../graphql/chat";

// userId extrait du token JWT (payload = 2e segment, encodé en base64)
function getUserId(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).userId;
  } catch {
    return null;
  }
}

function Msg({ username, pfp, children }: { username?: string; pfp?: string; children?: React.ReactNode }) {
  return (
    <Box sx={{
      width: '400px',
      backgroundColor: 'white',
      border: '2px solid #1a1a1a',
      borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
      boxShadow: '3px 3px 0px #1a1a1a',
      mx: 'auto',
      mb: 1,
      p: 1.5,
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Avatar src={pfp} sx={{ width: 28, height: 28 }}>
          {username?.[0]?.toUpperCase()}
        </Avatar>
        <Typography sx={{ color: "black", fontWeight: 600 }}>{username}</Typography>
      </Box>
      <Box sx={{ color: "black", wordBreak: "break-word" }}>{children}</Box>
    </Box>
  );
}

function Chat() {
  const { roomId } = useParams<{ roomId: string }>();
  const userId = getUserId();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [gifAnchor, setGifAnchor] = useState<HTMLElement | null>(null);
  const gifOpen = Boolean(gifAnchor);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Charge les messages de la room
  const { data, refetch } = useQuery<RoomMessagesResponse, RoomMessagesVars>(
    GET_ROOM_MESSAGES,
    { variables: { room_id: roomId! }, skip: !roomId, pollInterval: 3000, }
  );

  const [sendMessage] = useMutation<SendMessageResponse, SendMessageVars>(SEND_MESSAGE);

  const messages: MessageItem[] = data?.roomMessages ?? [];

  async function checkProfanity(text: string): Promise<boolean> {
    const res = await fetch("https://vector.profanity.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    return (await res.json()).isProfanity;
  }

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleSend = async () => {
    setError(null);
    const text = inputValue.trim();

    const paths = await canvasRef.current?.exportPaths();
    const hasDrawing = !!paths && paths.length > 0;
    const image = hasDrawing ? await canvasRef.current?.exportImage("png") : undefined;

    if (!text && !image) return;
    if (!roomId || !userId) return;

    try {
      if (text && (await checkProfanity(text))) {
        setError("Message blocked: inappropriate language.");
        return;
      }
      await sendMessage({ variables: { user_id: userId, room_id: roomId, text: text || undefined, image } });
      setInputValue("");
      canvasRef.current?.clearCanvas();
      await refetch();
    } catch (e) {
      console.error("Send failed:", e);
      setError("Failed to send, please try again.");
    }
  };

  const handleSendGif = async (url: string) => {
    if (!roomId || !userId) return;
    try {
      await sendMessage({ variables: { user_id: userId, room_id: roomId, image: url } });
      setGifAnchor(null);
      await refetch();
    } catch (e) {
      console.error("GIF send failed:", e);
    }
  };
  const prevCount = useRef(0);

  useEffect(() => {
    if (messages.length > prevCount.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevCount.current = messages.length;
  }, [messages]);

  return (
    <Grid container spacing={2} direction="column" height="100vh" sx={{ flexWrap: "nowrap" }}>
      <Link to="/rooms" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>Back</Button>
      </Link>

      <Grid sx={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <Logo size_xs='1.5rem' size_md='2.5rem' />
        <Box sx={{ mt: "auto" }}>
          {messages.map((msg) => (
            <Msg key={msg._id} username={msg.user?.username} pfp={msg.user?.pfp}>
              {msg.text}
              {msg.image && <img src={msg.image} alt="drawing" style={{ maxWidth: "100%", display: "block" , maxHeight: 250, margin: "8px auto 0", borderRadius: 8,}} />}
            </Msg>
          ))}
          <div ref={bottomRef} />
        </Box>
      </Grid>

      <Grid>
        <Container maxWidth="md">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: { xs: "100%", sm: "80%" }, mx: "auto", mt: "30px" }}>
            <DrawBox width={"100%"} height={"200px"} canvasRef={canvasRef} />

            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              label="Enter your message here"
              multiline maxRows={4} variant="filled"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(e) => setGifAnchor(e.currentTarget)} edge="end">
                        <GifIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Popover
              open={gifOpen}
              anchorEl={gifAnchor}
              onClose={() => setGifAnchor(null)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Box sx={{ p: 2, width: 360 }}>
                <GifPicker onSelect={handleSendGif} />
              </Box>
            </Popover>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button variant="contained" sx={{ width: "100%" }} onClick={handleSend}>Send</Button>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Chat;