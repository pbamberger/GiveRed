'use client'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/groups',    label: 'Find a group', demo: false },
  { href: '/dashboard', label: 'Dashboard',    demo: true  },
]

export default function NavBar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <AppBar position="sticky" component="header">
        <Toolbar sx={{ maxWidth: 840, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            aria-label="GiveRed home"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', flexGrow: 1, minWidth: 0 }}
          >
            <Box component="img" src="/logo-mark.svg" alt="" aria-hidden="true" sx={{ width: 24, height: 30, flexShrink: 0 }} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: 'primary.main', whiteSpace: 'nowrap' }}>
              GiveRed
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
            {NAV_LINKS.map(({ href, label, demo }) => (
              <Box key={href} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Button
                  component={Link}
                  href={href}
                  color="inherit"
                  size="small"
                  aria-current={pathname === href ? 'page' : undefined}
                  sx={{ fontWeight: pathname === href ? 700 : 400 }}
                >
                  {label}
                </Button>
                {demo && (
                  <Chip label="demo" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#ffdad5', color: 'primary.dark', pointerEvents: 'none' }} />
                )}
              </Box>
            ))}
            <Button
              component={Link}
              href="/start"
              variant="contained"
              color="primary"
              size="small"
              aria-current={pathname === '/start' ? 'page' : undefined}
            >
              Start a group
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setDrawerOpen(true)}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        id="mobile-nav-drawer"
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 260 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>GiveRed</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu" edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.map(({ href, label, demo }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={() => setDrawerOpen(false)}
                sx={{ fontWeight: pathname === href ? 700 : 400 }}
              >
                <ListItemText primary={label} />
                {demo && (
                  <Chip label="demo" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#ffdad5', color: 'primary.dark', ml: 1 }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            component={Link}
            href="/start"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            aria-current={pathname === '/start' ? 'page' : undefined}
          >
            Start a group
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
