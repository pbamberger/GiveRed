import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function GroupProfileLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Skeleton variant="circular" width={72} height={72} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={24} />
        </Box>
      </Box>

      {/* Stats row */}
      <Skeleton variant="rounded" height={72} sx={{ mb: 3, borderRadius: 2 }} />

      {/* Progress bar */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width="50%" sx={{ mb: 0.5 }} />
        <Skeleton variant="rounded" height={8} sx={{ borderRadius: 4 }} />
      </Box>

      {/* Next session card */}
      <Skeleton variant="text" width={120} height={32} sx={{ mb: 1.5 }} />
      <Skeleton variant="rounded" height={100} sx={{ mb: 3, borderRadius: 2 }} />

      {/* Members */}
      <Skeleton variant="text" width={140} height={32} sx={{ mb: 1.5 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} variant="circular" width={40} height={40} />
        ))}
      </Box>

      {/* Join section */}
      <Skeleton variant="rounded" height={56} sx={{ borderRadius: 20 }} />
    </Container>
  )
}
