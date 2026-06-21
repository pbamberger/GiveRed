import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Link from 'next/link'
import GroupsIcon from '@mui/icons-material/Groups'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import groupsData from '../../../data/groups.json'
import type { Group } from '../../../types'
import JoinSection from '../../../components/JoinSection'

const groups = groupsData as Group[]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const group = groups.find((g) => g.slug === slug)
  if (!group) return { title: 'Group not found — GiveRed' }
  return {
    title: `${group.name} — GiveRed`,
    description: `Join ${group.name}, a ${group.type.toLowerCase()} blood donation group in ${group.city}. ${group.totalDonations} donations and counting.`,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

export default async function GroupProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = groups.find((g) => g.slug === slug)
  if (!group) notFound()

  const goalProgress = group.goalPerYear > 0
    ? Math.min(100, Math.round((group.totalDonations / group.goalPerYear) * 100))
    : 0

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>

      {/* Group header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar
          sx={{
            width: 72, height: 72,
            bgcolor: 'primary.main',
            fontSize: '1.5rem', fontWeight: 700,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {getInitials(group.name)}
        </Avatar>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 400, lineHeight: 1.2 }}>
            {group.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
            <Chip label={group.type} size="small" color="primary" variant="outlined" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} aria-hidden="true" />
              <Typography variant="body2" color="text.secondary">{group.city}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Stats row */}
      <Box
        sx={{
          display: 'flex', gap: 3, mb: 3,
          p: 2, borderRadius: 2,
          backgroundColor: '#f5ddda',
        }}
        role="list"
        aria-label="Group statistics"
      >
        {[
          { icon: <FavoriteIcon sx={{ fontSize: 20, color: 'primary.main' }} />, value: group.totalDonations, label: 'donations' },
          { icon: <GroupsIcon sx={{ fontSize: 20, color: 'primary.main' }} />, value: group.memberCount, label: 'members' },
          { icon: <EmojiEventsIcon sx={{ fontSize: 20, color: 'primary.main' }} />, value: group.quarterDonations, label: 'this quarter' },
        ].map(({ icon, value, label }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }} role="listitem">
            {icon}
            <Box>
              <Typography variant="h6" component="span" sx={{ fontWeight: 700, display: 'block', lineHeight: 1 }}>
                {value}
              </Typography>
              <Typography variant="caption" color="text.secondary">{label}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Goal progress */}
      {group.goalPerYear > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Goal: {group.goalPerYear} donations this year
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {goalProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={goalProgress}
            aria-label={`${goalProgress}% of yearly goal reached`}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      )}

      {/* Next session */}
      {group.nextSession && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>Next session</Typography>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 1 }}>
                <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatDate(group.nextSession.date)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {group.nextSession.time}–{group.nextSession.endTime} · {group.nextSession.venue}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">Spots</Typography>
                  <Typography variant="body2">
                    {group.nextSession.spotsTaken} of {group.nextSession.spotsTotal} taken
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(group.nextSession.spotsTaken / group.nextSession.spotsTotal) * 100}
                  aria-label={`${group.nextSession.spotsTaken} of ${group.nextSession.spotsTotal} spots taken`}
                  sx={{ height: 6, borderRadius: 4, mb: 2 }}
                />
                <Button
                  component={Link}
                  href={`/book?group=${group.slug}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={group.nextSession.spotsTaken >= group.nextSession.spotsTotal}
                >
                  {group.nextSession.spotsTaken >= group.nextSession.spotsTotal ? 'Session full' : 'Book a session'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Members */}
      {group.members.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Members ({group.memberCount})
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            {group.members.slice(0, 4).map((m, i) => (
              <Avatar
                key={i}
                sx={{ width: 40, height: 40, bgcolor: 'secondary.main', fontSize: '0.875rem' }}
                aria-label={m.firstName}
              >
                {m.firstName[0]}
              </Avatar>
            ))}
            {group.memberCount > 4 && (
              <Chip
                label={`+${group.memberCount - 4} more`}
                size="small"
                sx={{ bgcolor: '#f5ddda' }}
              />
            )}
          </Box>
        </Box>
      )}

      {/* Badges */}
      {group.badges.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>Badges</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {group.badges.map((badge) => (
              <Chip
                key={badge}
                icon={<EmojiEventsIcon />}
                label={badge}
                size="small"
                sx={{ bgcolor: '#fcdfa6', color: '#251a00' }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Join section — client component */}
      <JoinSection group={group} />

    </Container>
  )
}
