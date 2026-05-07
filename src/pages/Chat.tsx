import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DrawBox from "../components/DrawBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Person } from "@mui/icons-material";
import Logo from "../components/Logo";
import { useState, type MouseEventHandler } from "react";

function Msg({ username, children }: { username?: string; children?: React.ReactNode }) {
  return (
    <Box sx={{
      width: '400px',
      backgroundColor: 'white',
      border: '2px solid #1a1a1a',
      borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
      boxShadow: '3px 3px 0px #1a1a1a',
      mx: 'auto',
      mb: 1,
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Person color="info" />
        <p style={{ color: "black" }}>{username}</p>
      </div>
      <p style={{ color: "black" }}>{children}</p>
    </Box>
  )
}

function MsgBox({ messages }: { messages: string[] }) {
  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '50vh' }}>
      <Msg username="Salut">Salut</Msg>
      {messages.map((msg, i) => (
        <Msg key={i}>{msg}</Msg>
      ))}
    </Box>
  )
}

function ChatBox({
  inputValue,
  setInputValue,
  sendMsg,
}: {
  inputValue: string;
  setInputValue: (v: string) => void;
  sendMsg: MouseEventHandler;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxHeight: '50vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", sm: "80%" },
            mx: "auto",
            mt: "30px",
          }}>
            <DrawBox width={"100%"} height={"200px"} />
            <TextField
              id="filled-multiline-flexible"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              label="Enter your message here"
              multiline
              maxRows={4}
              variant="filled"
            />
            <Button variant="contained" sx={{ width: "100%" }} onClick={sendMsg}>
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("")

  async function checkProfanity(text: string): Promise<boolean> {
    const res = await fetch("https://vector.profanity.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    })
    const data = await res.json()
    return data.isProfanity
  }



  const sendMsg: MouseEventHandler = (_event) => {

    const msg = inputValue
    if (msg != "") {
      const handle = async () => {
        console.log("ouais")
    try {
      const isProfane = await checkProfanity(msg)

      if (!isProfane) {
        setMessages(prev => [...prev, msg])
        setInputValue("")
      }
    } catch (error) {
      console.error("Profanity check failed:", error)
      // Handle error - maybe still allow the message or show an error
    }
  }

      handle()
    }
  }

  return (
    <Grid container spacing={2} direction={"column"} display={'flex'} justifyContent={'space-between'} height={'100vh'}>
      <Link to="/rooms" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Link>
      <Grid>
        <Logo size_xs='1.5rem' size_md='2.5rem' />
        <MsgBox messages={messages} />
      </Grid>
      <Grid>
        <ChatBox inputValue={inputValue} setInputValue={setInputValue} sendMsg={sendMsg} />
      </Grid>
    </Grid>
  );
}

export default Chat;
