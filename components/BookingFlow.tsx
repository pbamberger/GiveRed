'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ShareIcon from '@mui/icons-material/Share'
import type { Group, Session } from '../types'

type FlowState = 'selecting' | 'confirming' | 'confirmed'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function generateICS(session: Session, groupName: string): string {
  const start = session.date.replace(/-/g, '') + 'T' + session.time.replace(':', '') + '00'
  const end = session.date.replace(/-/g, '') + 'T' + session.endTime.replace(':', '') + '00'
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GiveRed//NZ//EN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Blood donation — ${groupName}`,
    `LOCATION:${session.venue}\\, ${session.address}`,
    'DESCRIPTION:Donation session with your GiveRed group.\\nBring ID\\, drink water\\, and eat beforehand.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadICS(session: Session, groupName: string) {
  const ics = generateICS(session, groupName)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'givered-session.ics'
  a.click()
  URL.revokeObjectURL(url)
}

// ── Session selection list ─────────────────────────────────────────────────

function SessionCard({
  session,
  onSelect,
}: {
  session: Session
  onSelect: (s: Session) => void
}) {
  const spotsLeft = session.spotsTotal - session.spotsTaken
  const fillPct = (session.spotsTaken / session.spotsTotal) * 100
  const isFull = spotsLeft === 0

  return (
    <Card elevation={1} sx={{ mb: 2, opacity: isFull ? 0.6 : 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
          <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {formatDate(session.date)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {session.time}–{session.endTime}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <LocationOnIcon sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0, fontSize: 20 }} aria-hidden="true" />
          <Box>
            <Typography variant="body2">{session.venue}</Typography>
            <Typography variant="body2" color="text.secondary">{session.address}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {isFull ? 'Session full' : `${spotsLeft} of ${session.spotsTotal} spots remaining`}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={fillPct}
          color={isFull ? 'error' : 'primary'}
          aria-label={`${session.spotsTaken} of ${session.spotsTotal} spots taken`}
          sx={{ height: 6, borderRadius: 4, mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isFull}
          onClick={() => onSelect(session)}
        >
          {isFull ? 'Session full' : 'Book this session'}
        </Button>
      </CardContent>
    </Card>
  )
}

// ── Pre-booking confirmation screen ───────────────────────────────────────

function ConfirmScreen({
  session,
  group,
  onConfirm,
  onBack,
}: {
  session: Session
  group: Group | null
  onConfirm: () => void
  onBack: () => void
}) {
  const [firstTimeOpen, setFirstTimeOpen] = useState(false)

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }} size="small">
        Back to sessions
      </Button>

      {group && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Booking for <strong>{group.name}</strong>
        </Typography>
      )}

      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{formatDate(session.date)}</Typography>
              <Typography variant="body2" color="text.secondary">{session.time}–{session.endTime}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <LocationOnIcon sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0, fontSize: 20 }} aria-hidden="true" />
            <Box>
              <Typography variant="body2">{session.venue}</Typography>
              <Typography variant="body2" color="text.secondary">{session.address}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* First-timer help */}
      <Box
        sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}
      >
        <Button
          fullWidth
          onClick={() => setFirstTimeOpen((o) => !o)}
          endIcon={firstTimeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ justifyContent: 'flex-start', px: 2, py: 1.5, textTransform: 'none', fontWeight: 500 }}
          aria-expanded={firstTimeOpen}
        >
          First time donating?
        </Button>
        <Collapse in={firstTimeOpen}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2, m: 0 }}>
              <li>The whole process takes about 45–60 minutes.</li>
              <li>You&apos;ll fill in a short health questionnaire before donating.</li>
              <li>Nurses and staff will guide you through every step.</li>
            </Typography>
          </Box>
        </Collapse>
      </Box>

      <Button
        href="/eligible"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        color="primary"
        size="small"
        sx={{ mb: 3, display: 'block' }}
      >
        Am I eligible to donate? →
      </Button>

      <Divider sx={{ mb: 3 }} />

      <Button variant="contained" color="primary" size="large" fullWidth onClick={onConfirm}>
        Confirm my booking
      </Button>
    </Box>
  )
}

// ── Booking confirmed ──────────────────────────────────────────────────────

function ConfirmedScreen({
  session,
  group,
}: {
  session: Session
  group: Group | null
}) {
  const [shareCopied, setShareCopied] = useState(false)
  const groupName = group?.name ?? 'your group'
  const newTotal = group ? group.totalDonations + 1 : null

  function share() {
    if (group) {
      navigator.clipboard.writeText(`https://givered.nz/join/${group.slug}`).then(() => {
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2500)
      })
    }
  }

  return (
    <Box sx={{ textAlign: 'center' }} role="status" aria-live="polite">
      <CheckCircleIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} aria-hidden="true" />
      <Typography variant="h4" sx={{ mb: 1 }}>
        See you {new Date(session.date).toLocaleDateString('en-NZ', { weekday: 'long' })}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {session.time} · {session.venue}
        <br />
        {session.address}
      </Typography>

      {/* Group impact panel */}
      {group && newTotal && (
        <Box
          sx={{
            mb: 3, p: 2.5, borderRadius: 3,
            background: 'linear-gradient(135deg, #ffdad5 0%, #fff8f7 100%)',
            border: '1px solid #f2b8b0',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="p" sx={{ color: 'primary.main', fontWeight: 800, lineHeight: 1, mb: 0.5 }}>
            {newTotal}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 600 }}>
            {group.name} donations — you&apos;re #{newTotal}!
          </Typography>
        </Box>
      )}

      {/* What to bring */}
      <Alert severity="info" icon={false} sx={{ textAlign: 'left', mb: 3, bgcolor: '#fff8f7' }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>What to bring</Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2, m: 0 }}>
          <li>Photo ID (driver licence, passport, or 18+ card)</li>
          <li>Water bottle — drink plenty before you arrive</li>
          <li>A light meal — eat 2–3 hours beforehand</li>
        </Typography>
      </Alert>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<CalendarTodayIcon />}
        fullWidth
        sx={{ mb: 2 }}
        onClick={() => downloadICS(session, groupName)}
      >
        Add to calendar
      </Button>

      {group && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShareIcon />}
          fullWidth
          sx={{ mb: 2 }}
          onClick={share}
        >
          {shareCopied ? 'Link copied!' : 'Invite someone to the group'}
        </Button>
      )}

      {group && (
        <Button
          href="/dashboard"
          variant="text"
          color="primary"
          fullWidth
        >
          View your group dashboard →
        </Button>
      )}
    </Box>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function BookingFlow({
  group,
  sessions,
}: {
  group: Group | null
  sessions: Session[]
}) {
  const [state, setState] = useState<FlowState>('selecting')
  const [selected, setSelected] = useState<Session | null>(null)

  function handleSelect(session: Session) {
    setSelected(session)
    setState('confirming')
  }

  function handleConfirm() {
    setState('confirmed')
  }

  if (state === 'confirmed' && selected) {
    return <ConfirmedScreen session={selected} group={group} />
  }

  if (state === 'confirming' && selected) {
    return (
      <ConfirmScreen
        session={selected}
        group={group}
        onConfirm={handleConfirm}
        onBack={() => setState('selecting')}
      />
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 0.5, fontWeight: 400 }}>
        Book a session
      </Typography>
      {group && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Upcoming sessions for <strong>{group.name}</strong> in {group.city}
        </Typography>
      )}

      {sessions.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No sessions available right now. Check back soon.
        </Typography>
      ) : (
        sessions.map((s) => (
          <SessionCard key={s.id} session={s} onSelect={handleSelect} />
        ))
      )}
    </Box>
  )
}
