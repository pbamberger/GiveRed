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
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import StarIcon from '@mui/icons-material/Star'
import groupsData from '../../data/groups.json'
import leaderboardData from '../../data/leaderboard.json'
import type { Group } from '../../types'

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

const ACTIVITY_FEED = [
  { id: 1, icon: 'booking', text: 'Aroha booked a spot for 12 July', daysAgo: 0 },
  { id: 2, icon: 'booking', text: 'James booked a spot for 12 July', daysAgo: 1 },
  { id: 3, icon: 'milestone', text: 'Smith Whānau reached 47 donations', daysAgo: 3 },
  { id: 4, icon: 'joined', text: 'Hemi joined the group', daysAgo: 5 },
  { id: 5, icon: 'session', text: 'New session added: 12 July at Auckland City Donor Centre', daysAgo: 6 },
  { id: 6, icon: 'donation', text: 'Wiremu donated — group total now 47', daysAgo: 12 },
  { id: 7, icon: 'reminder', text: 'Session reminder sent to 4 members', daysAgo: 15 },
  { id: 8, icon: 'donation', text: 'Aroha donated — group total now 46', daysAgo: 20 },
  { id: 9, icon: 'badge', text: 'Badge earned: Quarter Century (25 donations)', daysAgo: 28 },
  { id: 10, icon: 'joined', text: 'Maria joined the group', daysAgo: 35 },
  { id: 11, icon: 'donation', text: 'James donated — group total now 45', daysAgo: 42 },
]

function relativeDay(daysAgo: number): string {
  if (daysAgo === 0) return 'Today'
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 14) return '1 week ago'
  if (daysAgo < 21) return '2 weeks ago'
  if (daysAgo < 28) return '3 weeks ago'
  return `${Math.round(daysAgo / 30)} month${Math.round(daysAgo / 30) > 1 ? 's' : ''} ago`
}

function activityIcon(type: string) {
  switch (type) {
    case 'booking':  return <CalendarMonthIcon sx={{ fontSize: 18, color: 'primary.main' }} />
    case 'donation': return <FavoriteIcon sx={{ fontSize: 18, color: 'primary.main' }} />
    case 'milestone': return <EmojiEventsIcon sx={{ fontSize: 18, color: '#705c2e' }} />
    case 'joined':   return <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
    case 'session':  return <CalendarMonthIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
    case 'reminder': return <NotificationsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
    case 'badge':    return <StarIcon sx={{ fontSize: 18, color: '#705c2e' }} />
    default:         return <FavoriteIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
  }
}

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

      <Typography variant="h6" sx={{ mb: 1 }}>All members ({group.memberCount})</Typography>
      <List disablePadding>
        {group.members.map((member) => {
          const hasReminded = reminded.has(member.firstName)
          return (
            <ListItem
              key={member.firstName}
              disableGutters
              sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}
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

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} message={snackMsg} />
    </Box>
  )
}

// ── Sessions tab ───────────────────────────────────────────────────────────

type AddedSession = {
  id: string
  date: string
  time: string
  endTime: string
  venue: string
  spotsTotal: number
  spotsTaken: number
}

function SessionsTab() {
  const booked = group.members.filter((m) => m.booked).length
  const [dialogOpen, setDialogOpen] = useState(false)
  const [added, setAdded] = useState<AddedSession[]>([])
  const [form, setForm] = useState({ date: '', time: '10:00', endTime: '12:00', venue: '', spots: '10' })
  const [snackOpen, setSnackOpen] = useState(false)

  function handleAdd() {
    if (!form.date || !form.venue) return
    setAdded((prev) => [{
      id: `added-${Date.now()}`,
      date: form.date,
      time: form.time,
      endTime: form.endTime,
      venue: form.venue,
      spotsTotal: parseInt(form.spots) || 10,
      spotsTaken: 0,
    }, ...prev])
    setDialogOpen(false)
    setSnackOpen(true)
    setForm({ date: '', time: '10:00', endTime: '12:00', venue: '', spots: '10' })
  }

  const s = group.nextSession
  const spotsLeft = s ? s.spotsTotal - s.spotsTaken : 0
  const fillPct = s ? (s.spotsTaken / s.spotsTotal) * 100 : 0
  const memberBookPct = Math.round((booked / group.memberCount) * 100)

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Upcoming sessions</Typography>
        <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          Add session
        </Button>
      </Box>

      {/* Newly added sessions */}
      {added.map((ns) => (
        <Card key={ns.id} elevation={1} sx={{ mb: 2, border: '1px solid', borderColor: 'primary.light' }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
              <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{formatDate(ns.date)}</Typography>
                <Typography variant="body2" color="text.secondary">{ns.time}–{ns.endTime}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <LocationOnIcon sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0, fontSize: 20 }} aria-hidden="true" />
              <Typography variant="body2" color="text.secondary">{ns.venue}</Typography>
            </Box>
            <Chip label="Just added" size="small" sx={{ mt: 1.5, bgcolor: '#ffdad5', color: 'primary.dark' }} />
          </CardContent>
        </Card>
      ))}

      {/* Existing next session */}
      {s ? (
        <Card elevation={1}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{formatDate(s.date)}</Typography>
                <Typography variant="body2" color="text.secondary">{s.time}–{s.endTime}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              <LocationOnIcon sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0, fontSize: 20 }} aria-hidden="true" />
              <Typography variant="body2" color="text.secondary">{s.venue}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Available spots: {spotsLeft} of {s.spotsTotal} remaining
            </Typography>
            <LinearProgress variant="determinate" value={fillPct}
              aria-label={`${s.spotsTaken} of ${s.spotsTotal} spots taken`}
              sx={{ height: 6, borderRadius: 4, mb: 3 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Your group: {booked} of {group.memberCount} members booked ({memberBookPct}%)
            </Typography>
            <LinearProgress variant="determinate" value={memberBookPct} color="success"
              aria-label={`${booked} of ${group.memberCount} group members booked`}
              sx={{ height: 6, borderRadius: 4, mb: 2 }} />
            <Button href={`/book?group=${group.slug}`} variant="contained" color="primary" fullWidth>
              Book a spot
            </Button>
          </CardContent>
        </Card>
      ) : added.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="body1" color="text.secondary">No upcoming sessions. Add one above.</Typography>
        </Box>
      )}

      {/* Add session dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add a session</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
            required
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Start time"
              type="time"
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
            <TextField
              label="End time"
              type="time"
              value={form.endTime}
              onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          </Box>
          <TextField
            label="Venue"
            value={form.venue}
            onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))}
            placeholder="e.g. Auckland City Donor Centre"
            fullWidth
            required
          />
          <TextField
            label="Total spots"
            type="number"
            value={form.spots}
            onChange={(e) => setForm((f) => ({ ...f, spots: e.target.value }))}
            fullWidth
            slotProps={{ htmlInput: { min: 1, max: 50 } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!form.date || !form.venue}>
            Add session
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} message="Session added" />
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

      {leaderboard.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>{group.city} leaderboard</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Q2 2026 · donations this quarter</Typography>
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
                    primary={<Typography variant="body1" sx={{ fontWeight: isMe ? 700 : 400 }}>{entry.name}{isMe ? ' ★' : ''}</Typography>}
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

// ── Activity tab ───────────────────────────────────────────────────────────

function ActivityTab() {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Recent activity</Typography>
      <List disablePadding>
        {ACTIVITY_FEED.map((item, i) => (
          <ListItem
            key={item.id}
            disableGutters
            alignItems="flex-start"
            sx={{
              py: 1.25,
              borderBottom: i < ACTIVITY_FEED.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <ListItemAvatar sx={{ minWidth: 40, mt: 0.25 }}>
              <Box
                sx={{
                  width: 32, height: 32, borderRadius: '50%',
                  bgcolor: item.icon === 'milestone' || item.icon === 'badge' ? '#fcdfa6' : '#ffdad5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                {activityIcon(item.icon)}
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body2">{item.text}</Typography>}
              secondary={
                <Typography variant="caption" color="text.disabled">
                  {relativeDay(item.daysAgo)}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

// ── Dashboard page ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [tab, setTab] = useState(0)
  const TAB_NAMES = ['members', 'sessions', 'badges', 'activity']

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 5 }, px: { xs: 2, sm: 3 } }}>
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          aria-label="Dashboard sections"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Members" id="tab-members" aria-controls="panel-members" />
          <Tab label="Sessions" id="tab-sessions" aria-controls="panel-sessions" />
          <Tab label="Badges" id="tab-badges" aria-controls="panel-badges" />
          <Tab label="Activity" id="tab-activity" aria-controls="panel-activity" />
        </Tabs>
      </Box>

      <Box
        role="tabpanel"
        id={`panel-${TAB_NAMES[tab]}`}
        aria-labelledby={`tab-${TAB_NAMES[tab]}`}
      >
        {tab === 0 && <MembersTab />}
        {tab === 1 && <SessionsTab />}
        {tab === 2 && <BadgesTab />}
        {tab === 3 && <ActivityTab />}
      </Box>
    </Container>
  )
}
