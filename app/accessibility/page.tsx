import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

export const metadata: Metadata = {
  title: 'Accessibility statement — GiveRed',
  description: 'GiveRed accessibility statement — conformance status, known gaps, and how to report issues.',
}

export default function AccessibilityPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h2" component="h1" sx={{ mb: 1, fontWeight: 400 }}>
        Accessibility statement
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Last reviewed: June 2026
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        This is a prototype. A full accessibility audit will be completed before any public launch.
      </Alert>

      <Typography variant="body1" sx={{ mb: 3 }}>
        GiveRed is committed to making this website accessible to everyone, including people who
        use assistive technologies such as screen readers, keyboard navigation, or voice control.
      </Typography>

      <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
        Conformance status
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        We are working toward conformance with the{' '}
        <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong>, as required
        by the New Zealand Government Web Accessibility Standard 1.2 (effective March 2025).
      </Typography>

      <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
        What we have done
      </Typography>
      <Typography variant="body1" component="ul" sx={{ pl: 2, mb: 3 }}>
        <li>All pages include a skip-to-content link as the first focusable element.</li>
        <li>The page language is declared as New Zealand English (<code>lang=&quot;en-NZ&quot;</code>).</li>
        <li>Colour contrast has been verified using Material 3 colour tokens, which are designed to meet WCAG 4.5:1 ratios at their intended pairings.</li>
        <li>All interactive elements are keyboard-navigable.</li>
        <li>Form fields have persistent visible labels (not placeholder-only).</li>
        <li>Form error messages identify the field and describe the fix.</li>
        <li>Icon-only buttons include accessible labels (<code>aria-label</code>).</li>
        <li>The Noto Sans typeface is used throughout for complete Unicode coverage, including te reo Māori macrons.</li>
      </Typography>

      <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
        Known gaps (to be addressed before launch)
      </Typography>
      <Typography variant="body1" component="ul" sx={{ pl: 2, mb: 3 }}>
        <li>Full screen reader testing (NVDA + Chrome, VoiceOver + Safari) not yet complete.</li>
        <li>Touch target size audit (WCAG 2.5.8, minimum 24×24 CSS pixels) not yet complete.</li>
        <li>Focus visibility on all interactive elements not yet fully validated.</li>
        <li>The shareable impact card image does not yet have programmatic alt text.</li>
        <li>Te reo Māori text has not yet been fully tagged with <code>lang=&quot;mi&quot;</code>.</li>
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
        Contact us about accessibility
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        If you experience any difficulty using this website, or if you need content in a
        different format, please contact us:
      </Typography>
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <Typography variant="body2">
          Email: <strong>accessibility@givered.nz</strong><br />
          We aim to respond within 2 working days.
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary">
        This statement was prepared in accordance with the NZ Government Web Accessibility
        Standard 1.2, which requires agencies to publish an accessibility statement and
        provide a mechanism for users to report issues.
      </Typography>
    </Container>
  )
}
