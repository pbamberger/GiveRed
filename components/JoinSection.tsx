'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import type { Group } from '../types'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     z.string().min(1, 'Email is required').email('Enter a valid email address'),
  mobile:    z.string().optional(),
  consent:   z.boolean().refine((v) => v === true, { message: 'You must agree to continue' }),
})

type FormValues = z.infer<typeof schema>

export default function JoinSection({ group }: { group: Group }) {
  const [state, setState] = useState<'idle' | 'form' | 'confirmed'>('idle')
  const [copied, setCopied] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  const inviteUrl = `https://givered.nz/join/${group.slug}`

  function onSubmit(_data: FormValues) {
    return new Promise<void>((resolve) => {
      setTimeout(() => { setState('confirmed'); resolve() }, 800)
    })
  }

  function copyLink() {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (state === 'confirmed') {
    return (
      <Box
        sx={{ p: 3, borderRadius: 3, backgroundColor: '#f6fbf6', border: '1px solid', borderColor: 'success.light', textAlign: 'center' }}
        role="status" aria-live="polite"
      >
        <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} aria-hidden="true" />
        <Typography variant="h5" sx={{ mb: 1 }}>You&apos;re in!</Typography>
        {group.nextSession && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Next session: <strong>{group.nextSession.venue}</strong><br />
            {new Date(group.nextSession.date).toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long' })}{' '}
            at {group.nextSession.time}
          </Typography>
        )}
        <Button href={`/book?group=${group.slug}`} variant="contained" color="primary" size="large" fullWidth sx={{ mb: 2 }}>
          Book my spot
        </Button>
        <Button onClick={copyLink} variant="outlined" startIcon={<ContentCopyIcon />} fullWidth>
          {copied ? 'Copied!' : 'Share this group'}
        </Button>
      </Box>
    )
  }

  if (state === 'form') {
    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Join this group">
        <Typography variant="h6" sx={{ mb: 2 }}>Join {group.name}</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField label="First name" fullWidth required autoComplete="given-name"
            error={!!errors.firstName} helperText={errors.firstName?.message} {...register('firstName')} />
          <TextField label="Last name" fullWidth required autoComplete="family-name"
            error={!!errors.lastName} helperText={errors.lastName?.message} {...register('lastName')} />
        </Box>

        <TextField label="Email address" type="email" fullWidth required autoComplete="email"
          error={!!errors.email} helperText={errors.email?.message} sx={{ mb: 2 }} {...register('email')} />

        <TextField label="Mobile (optional)" type="tel" fullWidth autoComplete="tel"
          helperText="For session reminders via SMS" sx={{ mb: 2 }} {...register('mobile')} />

        <FormControlLabel
          control={<Checkbox {...register('consent')} aria-describedby={errors.consent ? 'consent-error' : undefined} />}
          label="I agree to be contacted about group donation sessions"
          sx={{ mb: errors.consent ? 0.5 : 2, alignItems: 'flex-start' }}
        />
        {errors.consent && (
          <Typography id="consent-error" variant="body2" color="error" sx={{ mb: 2, ml: 4 }} role="alert">
            {errors.consent.message}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="button" variant="text" onClick={() => setState('idle')} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} sx={{ flex: 1 }}>
            {isSubmitting ? 'Joining…' : 'Join group'}
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Divider sx={{ my: 3 }} />
      <Button variant="contained" color="primary" size="large" fullWidth startIcon={<FavoriteIcon />} onClick={() => setState('form')}>
        Join this group
      </Button>
    </Box>
  )
}
