import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

type Gif = { id: string; images: { fixed_height: { url: string } } };

function GifPicker({ onSelect }: { onSelect: (url: string) => void }) {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState<Gif[]>([]);

  const search = async () => {
    if (!query.trim()) return;
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(query)}&limit=12`
    );
    const json = await res.json();
    setGifs(json.data ?? []);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth size="small" label="Search GIFs" value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <Button variant="contained" color="secondary" onClick={search}>Search</Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, height: 200, overflowY: "auto" }}>
        {gifs.map((g) => (
          <img
            key={g.id}
            src={g.images.fixed_height.url}
            alt="gif"
            style={{ height: 80, cursor: "pointer", borderRadius: 4 }}
            onClick={() => onSelect(g.images.fixed_height.url)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default GifPicker;