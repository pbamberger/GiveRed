'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Alert from '@mui/material/Alert'
import Fab from '@mui/material/Fab'
import Snackbar from '@mui/material/Snackbar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import groupsData from '../../data/groups.json'
import leaderboardData from '../../data/leaderboard.json'
import type { Group } from '../../types'

// Prototype: hardcoded to smith-whanau as the "logged in" champion's group
const CHAMPION_SLUG = 'smith-whanau'
const group = (groupsData as Group[]).find((g) => g.slug === CHAMPION_SLUG)!
const leaderboard = (leaderboardData as Record<string, { rank: number; name: string; slug: string; quarterDonations: number }[]>)[group.city] ?? []

const BADGE_MILESTONES = [
  { count: 1,   name: 'First Drop' },
  { count: 5,   name: 'High Five' },
  { count: 10,  name: 'Ten Strong' },
  { count: 25,  name: 'Quarter Century' },
  { count: 50,  name: 'Fifty and Counting' },
  { count: 100, name: 'Century Crew' },
]

function nextMilestone(total: number) {
  return BADGE_MILESTONES.find((m) => m.count > total)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'long' })
}

// ── Members tab ────────────────────────────────────────────────────────────

function MembersTab() {
  const [reminded, setReminded] = useState<Set<string>>(new Set())
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const [inviteCopied, setInviteCopied] = useState(false)

  const booked = group.members.filter((m) => m.booked).length

  function remind(firstName: string) {
    setReminded((prev) => new Set([...prev, firstName]))
    setSnackMsg(`Reminder sent to ${firstName}`)
    setSnackOpen(true)
  }

  function remindAll() {
    const unbooked = group.members.filter((m) => !m.booked).map((m) => m.firstName)
    setReminded(new Set(group.members.map((m) => m.firstName)))
    setSnackMsg(`Reminders sent to ${unbooked.length} members`)
    setSnackOpen(true)
  }

  function copyInvite() {
    navigator.clipboard.writeText(`https://givered.nz/join/${group.slug}`).then(() => {
      setInviteCopied(true)
      setTimeout(() => setInviteCopied(false), 2000)
    })
  }

  return (
    <Box sx={{ position: 'relative', pb: 10 }}>
      {/* Session banner */}
      {group.nextSession && (
        <Alert
          severity="info"
          sx={{ mb: 3, bgcolor: '#ffdad5', color: 'text.primary', '& .MuiAlert-icon': { color: 'primary.main' } }}
          action={
            <Button size="small" color="inherit" startIcon={<NotificationsIcon />} onClick={remindAll}>
              Remind all
            </Button>
          }
        >
          <strong>Next session: {formatDate(group.nextSession.date)}</strong>
          {' · '}{booked} of {group.memberCount} booked
        </Alert>
      )}

      {/* Member list */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        All members ({group.memberCount})
      </Typography>
      <List disablePadding>
        {group.members.map((member) => {
          const hasReminded = reminded.has(member.firstName)
          return (
            <ListItem
              key={member.firstName}
              disableGutters
              sx={{
                py: 1, borderBottom: '1px solid', borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
              secondaryAction={
                !member.booked && (
                  <Button
                    size="small"
                    variant={hasReminded ? 'text' : 'outlined'}
                    startIcon={<NotificationsIcon sx={{ fontSize: 16 }} />}
                    onClick={() => remind(member.firstName)}
                    disabled={hasReminded}
                    sx={{ minWidth: 90 }}
                  >
                    {hasReminded ? 'Sent' : 'Remind'}
                  </Button>
                )
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: member.booked ? 'primary.main' : 'action.disabledBackground', width: 36, height: 36, fontSize: '0.875rem' }}>
                  {member.firstName[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.firstName}
                secondary={
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                    {member.booked ? (
                      <><CheckCircleIcon sx={{ fontSize: 14, color: 'success.main' }} /><span style={{ color: '#2e7d32', fontSize: '0.75rem' }}>Booked</span></>
                    ) : (
                      <><RadioButtonUncheckedIcon sx={{ fontSize: 14, color: 'text.disabled' }} /><span style={{ fontSize: '0.75rem', color: '#757575' }}>Not booked</span></>
                    )}
                  </Box>
                }
              />
            </ListItem>
          )
        })}
      </List>

      {/* Invite FAB */}
      <Fab
        color="primary"
        variant="extended"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={copyInvite}
        aria-label="Copy group invite link"
      >
        {inviteCopied ? <ContentCopyIcon sx={{ mr: 1 }} /> : <PersonAddIcon sx={{ mr: 1 }} />}
        {inviteCopied ? 'Link copied!' : 'Invite someone'}
      </Fab>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
      />
    </Box>
  )
}

// ── Sessions tab ───────────────────────────────────────────────────────────

function SessionsTab() {
  const booked = group.members.filter((m) => m.booked).length

  if (!group.nextSession) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          No upcoming sessions scheduled yet.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sessions are added by the group champion. Check back soon.
        </Typography>
      </Box>
    )
  }

  const s = group.nextSession
  const spotsLeft = s.spotsTotal - s.spotsTaken
  const fillPct = (s.spotsTaken / s.spotsTotal) * 100
  const memberBookPct = Math.round((booked / group.memberCount) * 100)

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Upcoming sessions</Typography>
      <Card elevation={1}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatDate(s.date)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {s.time}–{s.endTime}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <LocationOnIcon sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0, fontSize: 20 }} aria-hidden="true" />
            <Typography variant="body2" color="text.secondary">{s.venue}</Typography>
          </Box>

          {/* Spot availability */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Available spots: {spotsLeft} of {s.spotsTotal} remaining
          </Typography>
          <LinearProgress variant="determinate" value={fillPct}
            aria-label={`${s.spotsTaken} of ${s.spotsTotal} spots taken`}
            sx={{ height: 6, borderRadius: 4, mb: 3 }} />

          {/* Group booking progress */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Your group: {booked} of {group.memberCount} members booked ({memberBookPct}%)
          </Typography>
          <LinearProgress variant="determinate" value={memberBookPct} color="success"
            aria-label={`${booked} of ${group.memberCount} group members booked`}
            sx={{ height: 6, borderRadius: 4, mb: 2 }} />

          <Button
            href={`/book?group=${group.slug}`}
            variant="contained"
            color="primary"
            fullWidth
          >
            Book a spot
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

// ── Badges tab ─────────────────────────────────────────────────────────────

function BadgesTab() {
  const next = nextMilestone(group.totalDonations)
  const goalProgress = group.goalPerYear > 0
    ? Math.min(100, Math.round((group.totalDonations / group.goalPerYear) * 100))
    : 0
  const myRank = leaderboard.findIndex((l) => l.slug === group.slug) + 1

  return (
    <Box>
      {/* Big number */}
      <Box sx={{ textAlign: 'center', mb: 4, py: 3, borderRadius: 3, bgcolor: '#fff8f7' }}>
        <Typography variant="h1" component="p" sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1, mb: 0.5 }}>
          {group.totalDonations}
        </Typography>
        <Typography variant="body1" color="text.secondary">donations all time</Typography>
        {next && (
          <Chip
            label={`${next.count - group.totalDonations} more to ${next.name}`}
            size="small"
            sx={{ mt: 1.5, bgcolor: '#ffdad5', color: 'primary.dark' }}
          />
        )}
      </Box>

      {/* Yearly goal progress */}
      <Typography variant="h6" sx={{ mb: 1 }}>Yearly goal</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {group.totalDonations} of {group.goalPerYear} donations
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{goalProgress}%</Typography>
      </Box>
      <LinearProgress variant="determinate" value={goalProgress}
        aria-label={`${goalProgress}% of yearly goal`}
        sx={{ height: 8, borderRadius: 4, mb: 4 }} />

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {group.city} leaderboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Q2 2026 · donations this quarter
          </Typography>
          <List disablePadding>
            {leaderboard.map((entry) => {
              const isMe = entry.slug === group.slug
              return (
                <ListItem
                  key={entry.slug}
                  disableGutters
                  sx={{
                    py: 1.25, px: 2, mb: 1, borderRadius: 2,
                    bgcolor: isMe ? '#ffdad5' : 'background.paper',
                    border: '1px solid',
                    borderColor: isMe ? 'primary.light' : 'divider',
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: entry.rank === 1 ? '#b02d21' : 'text.secondary' }}>
                      {entry.rank === 1 ? '🏆' : `#${entry.rank}`}
                    </Typography>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: isMe ? 700 : 400 }}>
                        {entry.name}{isMe ? ' ★' : ''}
                      </Typography>
                    }
                    secondary={`${entry.quarterDonations} donations`}
                  />
                </ListItem>
              )
            })}
          </List>
          {myRank > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
              You&apos;re ranked #{myRank} in {group.city} this quarter
            </Typography>
          )}
        </Box>
      )}

      {/* Earned badges */}
      <Typography variant="h6" sx={{ mb: 2 }}>Badges earned</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {group.badges.map((badge) => (
          <Box
            key={badge}
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              p: 2, borderRadius: 2, bgcolor: '#fcdfa6',
              minWidth: 100, textAlign: 'center',
            }}
          >
            <EmojiEventsIcon sx={{ color: '#705c2e', mb: 0.5 }} aria-hidden="true" />
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#251a00', lineHeight: 1.2 }}>
              {badge}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ── Dashboard page ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [tab, setTab] = useState(0)

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 5 }, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, fontWeight: 700 }} aria-hidden="true">
          {group.name[0]}
        </Avatar>
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {group.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {group.city} · champion view
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          aria-label="Dashboard sections"
          variant="fullWidth"
        >
          <Tab label="Members" id="tab-members" aria-controls="panel-members" />
          <Tab label="Sessions" id="tab-sessions" aria-controls="panel-sessions" />
          <Tab label="Badges" id="tab-badges" aria-controls="panel-badges" />
        </Tabs>
      </Box>

      <Box
        role="tabpanel"
        id={`panel-${['members', 'sessions', 'badges'][tab]}`}
        aria-labelledby={`tab-${['members', 'sessions', 'badges'][tab]}`}
      >
        {tab === 0 && <MembersTab />}
        {tab === 1 && <SessionsTab />}
        {tab === 2 && <BadgesTab />}
      </Box>
    </Container>
  )
}
