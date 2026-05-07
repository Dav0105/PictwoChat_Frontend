import { Box } from "@mui/material";
import { letterColors, title } from "../theme";

type LogoProps = {
  size_xs?: string,
  size_md?: string
  animate?: boolean
}

function Logo({size_xs = '3rem', size_md = '5rem', animate = false}: LogoProps) {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
      {title.split('').map((letter, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            fontSize: { xs: size_xs, md: size_md },
            fontWeight: 'bold',
            color: letterColors[index % 3],
            display: 'inline-block',
            animation: animate? 'wave 1.5s ease-in-out infinite': 'none',
            animationDelay: animate? `${index * 0.1}s`: 'unset',
            '@keyframes wave': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-15px)' },
            },
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </Box>
      ))}
    </Box>
  )
}

export default Logo