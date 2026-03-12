import { Box, Button, Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { letterColors } from "../theme";
import DrawBox from "../components/DrawBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const title = "PictwoChat";

function Chat() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Link to="/rooms" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Link>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "2px" }}>
            {title.split("").map((letter, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  fontWeight: "bold",
                  color: letterColors[index % 3],
                  display: "inline-block",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </Box>
            ))}
          </Box>
          {/* <Box sx={{
            width: '600px',
            height: '400px',
            backgroundColor: 'white',
            border: '2px solid #1a1a1a',
            borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
            boxShadow: '3px 3px 0px #1a1a1a',
            mx: 'auto',
          }} /> */}



          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: { xs: "100%", sm: "80%" },
              mx: "auto",
              mt: "30px",
            }}
          >
            <DrawBox width={"100%"} height={"200px"} />
            <TextField
                id="filled-multiline-flexible"
                label="Enter your message here"
                multiline
                maxRows={4}
                variant="filled"
            />
            <Button variant="contained" sx={{ width: "100%" }}>
              send
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Chat;
