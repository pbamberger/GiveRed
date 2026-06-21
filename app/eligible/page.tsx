import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export const metadata: Metadata = {
  title: 'Am I eligible to donate? — GiveRed',
  description: 'Check whether you can donate blood using the official New Zealand Blood Service eligibility checker.',
}

export default function EligiblePage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 400 }}>
        Am I eligible to donate?
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Most healthy adults aged 16–71 can donate blood. The best way to check is to use
        the official eligibility checker on the New Zealand Blood Service website — it takes
        about two minutes and covers all the criteria.
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        GiveRed does not provide medical or eligibility advice. The authoritative source is
        New Zealand Blood Service (NZBS). Always check with them if you are unsure.
      </Alert>

      <Button
        href="https://www.nzblood.co.nz/give-blood/can-i-give/"
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="primary"
        size="large"
        endIcon={<OpenInNewIcon />}
        fullWidth
        sx={{ mb: 2 }}
      >
        Check my eligibility on NZBS
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        Opens the New Zealand Blood Service website in a new tab.
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
          Common questions
        </Typography>
        {[
          { q: 'I have a tattoo or piercing', a: 'You may need to wait 4 months after getting a tattoo or piercing from an unregistered studio. Registered studios in NZ are generally fine immediately.' },
          { q: 'I take prescription medication', a: 'It depends on the medication. Many medications are fine; some require a waiting period. The NZBS eligibility checker will ask about specific medications.' },
          { q: 'I recently travelled overseas', a: 'Travel to some countries may require a deferral period. The eligibility checker includes a travel section.' },
          { q: 'I am under 16 or over 65', a: 'You must be at least 16 to donate. First-time donors must be under 66. Existing donors may be able to continue donating past 66 with medical clearance.' },
        ].map(({ q, a }) => (
          <Box key={q} sx={{ mb: 2.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>{q}</Typography>
            <Typography variant="body2" color="text.secondary">{a}</Typography>
          </Box>
        ))}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
          These are general guidelines only. Always use the NZBS eligibility checker for your specific situation.
        </Typography>
      </Box>
    </Container>
  )
}
