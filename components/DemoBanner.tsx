'use client'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const SESSION_KEY = 'givered-demo-banner-dismissed'

export default function DemoBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) setVisible(true)
  }, [])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <Box
      role="banner"
      sx={{
        backgroundColor: '#ffdad5',
        borderBottom: '1px solid #f2b8b0',
        px: { xs: 2, sm: 3 },
        py: 0.75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        minHeight: 40,
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: '#410002', textAlign: 'center', flex: 1 }}
      >
        <strong>Prototype</strong> — all data is illustrative. Not a real service.
      </Typography>
      <IconButton
        size="small"
        onClick={dismiss}
        aria-label="Dismiss prototype notice"
        sx={{ color: '#410002', flexShrink: 0, p: 0.5 }}
      >
        <CloseIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  )
}
