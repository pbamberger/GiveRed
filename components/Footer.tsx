'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import NextLink from 'next/link'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: { xs: 2, sm: 3 },
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          maxWidth: 840,
          mx: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2026 GiveRed — helping NZ donate together
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {[
            { label: 'About', href: '/about' },
            { label: 'Am I eligible?', href: '/eligible' },
            { label: 'Accessibility', href: '/accessibility' },
          ].map(({ label, href }) => (
            <MuiLink
              key={href}
              component={NextLink}
              href={href}
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              {label}
            </MuiLink>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
