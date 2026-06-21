'use client'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/groups',    label: 'Find a group', demo: false },
  { href: '/dashboard', label: 'Dashboard',    demo: true  },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <AppBar position="sticky" component="header">
      <Toolbar sx={{ maxWidth: 840, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Box
          component={Link}
          href="/"
          aria-label="GiveRed home"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        >
          <Box component="img" src="/logo-mark.svg" alt="" aria-hidden="true" sx={{ width: 24, height: 30 }} />
          <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
            GiveRed
          </Typography>
        </Box>

        {/* Nav links — hidden on xs */}
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
          <Button component={Link} href="/start" variant="contained" color="primary" size="small"
            aria-current={pathname === '/start' ? 'page' : undefined}>
            Start a group
          </Button>
        </Box>

        {/* Mobile — single CTA */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1, alignItems: 'center' }}>
          <Button component={Link} href="/dashboard" color="inherit" size="small"
            aria-current={pathname === '/dashboard' ? 'page' : undefined}>
            Dashboard
          </Button>
          <Button component={Link} href="/start" variant="contained" color="primary" size="small"
            aria-current={pathname === '/start' ? 'page' : undefined}>
            Start
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
