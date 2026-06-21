import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/Groups'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, sm: 14 }, px: { xs: 2, sm: 3 }, textAlign: 'center' }}>
      <Typography
        variant="h1"
        component="p"
        sx={{ fontSize: '5rem', fontWeight: 700, color: 'primary.main', lineHeight: 1, mb: 2 }}
        aria-hidden="true"
      >
        404
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 400, mb: 2 }}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        That page doesn&apos;t exist — it may have moved or the link might be wrong.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button href="/" variant="contained" color="primary" startIcon={<HomeIcon />}>
          Go home
        </Button>
        <Button href="/groups" variant="outlined" color="primary" startIcon={<GroupsIcon />}>
          Find a group
        </Button>
      </Box>
    </Container>
  )
}
