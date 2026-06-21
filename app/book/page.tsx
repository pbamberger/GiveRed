import type { Metadata } from 'next'
import { Suspense } from 'react'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import BookingFlow from '../../components/BookingFlow'
import groupsData from '../../data/groups.json'
import sessionsData from '../../data/sessions.json'
import type { Group, Session } from '../../types'

export const metadata: Metadata = {
  title: 'Book a session — GiveRed',
  description: 'Choose an upcoming blood donation session for your group.',
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>
}) {
  const { group: groupSlug } = await searchParams
  const groups = groupsData as Group[]
  const sessions = sessionsData as Session[]

  const group = groupSlug ? groups.find((g) => g.slug === groupSlug) : null
  const citySessions = group
    ? sessions.filter((s) => s.city === group.city)
    : sessions

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
        <BookingFlow group={group ?? null} sessions={citySessions} />
      </Suspense>
    </Container>
  )
}
