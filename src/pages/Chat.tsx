import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DrawBox from "../components/DrawBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Person } from "@mui/icons-material";
import Logo from "../components/Logo";
import { useRef, useState, type MouseEventHandler } from "react";

function Chat() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const textFieldRef = useRef<any>(null)

  function ChatBox() {
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
                ref={textFieldRef}
                label="Enter your message here"
                multiline
                maxRows={4}
                variant="filled"
              />
              <Button variant="contained" sx={{ width: "100%" }} onClick={sendMsg} >Send</Button>
            </Box>

          </Box>
        </Container>
      </Box>
    )
  }

  function MsgBox() {
    return (
      <Box sx={{
        overflowY: 'auto',
        maxHeight: '50vh'
      }}>
        <Msg username="Salut">Salut</Msg>
        {messages.map(msg => (
          <Msg>{msg}</Msg>
        ))}
      </Box>
    )
  }

  function Msg({ username, children }: any) {
    return (
      <Box color={"white"} sx={{
        width: '400px',
        // height: '100px',
        backgroundColor: 'white',
        border: '2px solid #1a1a1a',
        // padding: '10px',
        borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
        boxShadow: '3px 3px 0px #1a1a1a',
        mx: 'auto',
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Person color="info" />
          <p style={{ color: "black" }}>{username}</p>
        </div>
        <p style={{ color: "black" }}>{children}</p>
      </Box>
    )
  }

  const sendMsg: MouseEventHandler = (event) => {
    let msg: string = ""
    if (textFieldRef.current) {
      msg = textFieldRef.current.value;
    }
    setMessages([...messages, msg])
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

        <MsgBox />
      </Grid>

      <Grid>
        <ChatBox />
      </Grid>
    </Grid>
  );
}

export default Chat;
