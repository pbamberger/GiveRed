'use client'
import Box from '@mui/material/Box'
import MuiPagination from '@mui/material/Pagination'

interface PaginatorProps {
  count: number
  page: number
  onChange: (page: number) => void
  size?: 'small' | 'medium' | 'large'
}

export default function Paginator({ count, page, onChange, size = 'large' }: PaginatorProps) {
  if (count <= 1) return null
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        size={size}
      />
    </Box>
  )
}
