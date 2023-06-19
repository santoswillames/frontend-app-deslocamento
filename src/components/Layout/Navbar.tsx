import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import theme from '@/pages/theme'

export default function Navbar() {
  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
      }}
      color="default"
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          App-Deslocamento
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
