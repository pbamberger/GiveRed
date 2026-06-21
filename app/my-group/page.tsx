'use client'
import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useState } from 'react'
import groupsData from '../../data/groups.json'
import type { Group } from '../../types'

// Prototype: hardcoded to smith-whanau as the demo member's group
const group = (groupsData as Group[]).find((g) => g.slug === 'smith-whanau')!

// Mock personal stats for the demo member
const MY_DONATIONS: number = 3
const MY_BADGES = ['First Drop']

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

export default function MyGroupPage() {
  const [copied, setCopied] = useState(false)

  function copyInvite() {
    navigator.clipboard.writeText(`https://givered.nz/join/${group.slug}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>

      {/* Personal header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Your group</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontWeight: 700, fontSize: '1.25rem', flexShrink: 0 }}
            aria-hidden="true"
          >
            {group.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {group.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip label={group.type} size="small" color="primary" variant="outlined" />
              <Typography variant="body2" color="text.secondary">{group.city}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Your stats */}
      <Box
        sx={{
          display: 'flex', gap: 0, mb: 3,
          borderRadius: 3, overflow: 'hidden',
          border: '1px solid', borderColor: 'divider',
        }}
        role="list"
        aria-label="Your stats"
      >
        {[
          { value: MY_DONATIONS, label: 'your donations', icon: <FavoriteIcon sx={{ fontSize: 20, color: 'primary.main' }} /> },
          { value: group.totalDonations, label: 'group total', icon: <GroupsIcon sx={{ fontSize: 20, color: 'primary.main' }} /> },
          { value: group.memberCount, label: 'members', icon: <GroupsIcon sx={{ fontSize: 20, color: 'text.secondary' }} /> },
        ].map(({ value, label, icon }, i) => (
          <Box
            key={label}
            role="listitem"
            sx={{
              flex: 1, textAlign: 'center', py: 2, px: 1,
              borderRight: i < 2 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>{icon}</Box>
            <Typography variant="h5" component="span" sx={{ fontWeight: 700, display: 'block', lineHeight: 1 }}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Next session */}
      {group.nextSession && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>Your next session</Typography>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                <CalendarMonthIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatDate(group.nextSession.date)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {group.nextSession.time}–{group.nextSession.endTime}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.25, flexShrink: 0 }} aria-hidden="true" />
                <Typography variant="body2" color="text.secondary">{group.nextSession.venue}</Typography>
              </Box>
              <Button
                href={`/book?group=${group.slug}`}
                variant="contained"
                color="primary"
                fullWidth
              >
                Book my spot
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Your badges */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Your badges</Typography>
        <List disablePadding>
          {MY_BADGES.map((badge) => (
            <ListItem
              key={badge}
              disableGutters
              sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EmojiEventsIcon sx={{ color: '#705c2e' }} aria-hidden="true" />
              </ListItemIcon>
              <ListItemText
                primary={badge}
                secondary={`Earned at ${MY_DONATIONS} donation${MY_DONATIONS !== 1 ? 's' : ''}`}
              />
            </ListItem>
          ))}
        </List>
        {group.totalDonations < 5 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {5 - MY_DONATIONS} more donation{5 - MY_DONATIONS !== 1 ? 's' : ''} to earn High Five
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Quick actions */}
      <Typography variant="h6" sx={{ mb: 2 }}>Quick actions</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          href={`/book?group=${group.slug}`}
          variant="outlined"
          color="primary"
          startIcon={<CalendarMonthIcon />}
          fullWidth
        >
          Book a session
        </Button>
        <Button
          href={`/groups/${group.slug}`}
          variant="outlined"
          color="primary"
          startIcon={<GroupsIcon />}
          fullWidth
        >
          View group profile
        </Button>
        <Button
          onClick={copyInvite}
          variant="outlined"
          color="primary"
          startIcon={<ContentCopyIcon />}
          fullWidth
        >
          {copied ? 'Link copied!' : 'Invite someone'}
        </Button>
      </Box>
    </Container>
  )
}
