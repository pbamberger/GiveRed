'use client'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh'
import HomeIcon from '@mui/icons-material/Home'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, sm: 14 }, px: { xs: 2, sm: 3 }, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 400, mb: 2 }}>
        Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        An unexpected error occurred. Try again — if the problem persists, go back to the home page.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button onClick={reset} variant="contained" color="primary" startIcon={<RefreshIcon />}>
          Try again
        </Button>
        <Button href="/" variant="outlined" color="primary" startIcon={<HomeIcon />}>
          Go home
        </Button>
      </Box>
    </Container>
  )
}
