'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import GroupCard from './GroupCard'
import Paginator from './Paginator'
import type { Group } from '../types'

interface GroupsResultsProps {
  groups: Group[]
  total: number
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export default function GroupsResults({ groups, total, page, pageCount, onPageChange }: GroupsResultsProps) {
  if (total === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          No groups found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try a different search, or{' '}
          <a href="/start" style={{ color: 'inherit' }}>
            start your own group
          </a>
          .
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {total} group{total !== 1 ? 's' : ''} found
        {pageCount > 1 && ` · page ${page} of ${pageCount}`}
      </Typography>
      <Grid container spacing={3}>
        {groups.map((group) => (
          <Grid key={group.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <GroupCard group={group} />
          </Grid>
        ))}
      </Grid>
      <Paginator count={pageCount} page={page} onChange={onPageChange} />
    </>
  )
}
