'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import GroupsIcon from '@mui/icons-material/Groups'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'
import type { Group } from '../types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

export default function GroupCard({ group }: { group: Group }) {
  return (
    <Card
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3, flex: 1, mr: 1 }}>
            {group.name}
          </Typography>
          <Chip label={group.type} size="small" color="primary" variant="outlined" sx={{ flexShrink: 0 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} aria-hidden="true" />
            <Typography variant="body2" color="text.secondary">{group.city}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GroupsIcon sx={{ fontSize: 16, color: 'text.secondary' }} aria-hidden="true" />
            <Typography variant="body2" color="text.secondary">{group.memberCount} members</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FavoriteIcon sx={{ fontSize: 16, color: 'primary.main' }} aria-hidden="true" />
            <Typography variant="body2" color="text.secondary">{group.quarterDonations} this quarter</Typography>
          </Box>
        </Box>

        {group.nextSession ? (
          <Box
            sx={{
              p: 1.5, borderRadius: 2,
              bgcolor: '#ffdad5',
              display: 'flex', alignItems: 'center', gap: 1,
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} aria-hidden="true" />
            <Typography variant="body2" sx={{ color: 'primary.dark' }}>
              Next: {formatDate(group.nextSession.date)} · {group.nextSession.suburb}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No session scheduled yet
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={Link}
          href={`/groups/${group.slug}`}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          fullWidth
          aria-label={`View ${group.name}`}
        >
          View group
        </Button>
      </CardActions>
    </Card>
  )
}
