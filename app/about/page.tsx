import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const metadata: Metadata = {
  title: 'About — GiveRed',
  description: 'How GiveRed helps New Zealanders donate blood together, and how we handle your data.',
}

export default function AboutPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 400 }}>
        About GiveRed
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        GiveRed is a community platform that makes it easier for New Zealanders to donate blood —
        together. By organising into groups, donors stay motivated, hold each other accountable,
        and turn a solitary medical appointment into a shared habit.
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        New Zealand Blood Service collects around 120,000 units of blood each year. Despite this,
        shortages occur regularly — particularly for rare blood types and during holiday periods.
        The most effective way to close that gap is to bring in more regular donors.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        GiveRed is designed for group champions: the person in a whānau, workplace, sports club,
        or community who makes things happen. We give them the tools to recruit, coordinate, and
        celebrate — so giving blood becomes part of how their group shows up for their community.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Your privacy
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        GiveRed collects only the information needed to coordinate your group: names, email
        addresses, and optional mobile numbers. This information is used only to send session
        reminders and group updates. We do not share your data with third parties. You can ask
        us to delete your data at any time by contacting us at privacy@givered.nz.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        GiveRed operates in accordance with the New Zealand Privacy Act 2020.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button href="/start" variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
          Start a group
        </Button>
        <Button href="/groups" variant="outlined" color="primary">
          Find a group
        </Button>
      </Box>
    </Container>
  )
}
