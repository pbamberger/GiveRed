import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function BookLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      {/* Title */}
      <Skeleton variant="text" width="50%" height={48} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={24} sx={{ mb: 3 }} />

      {/* Session cards */}
      {[0, 1, 2].map((i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={96}
          sx={{ mb: 2, borderRadius: 2 }}
        />
      ))}

      {/* Action button */}
      <Skeleton variant="rounded" height={56} sx={{ mt: 2, borderRadius: 20 }} />
    </Container>
  )
}
