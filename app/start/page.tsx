'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// ── Types ──────────────────────────────────────────────────────────────────

const GROUP_TYPES = ['Family', 'Workplace', 'Sports', 'School', 'Community', 'Other'] as const
type GroupType = (typeof GROUP_TYPES)[number]

const NZ_CITIES = ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Dunedin', 'Napier-Hastings', 'Palmerston North', 'Nelson', 'Rotorua', 'Other']

const step1Schema = z.object({
  groupName: z.string().min(2, 'Group name must be at least 2 characters').max(50, 'Group name must be 50 characters or less'),
  groupType: z.enum(GROUP_TYPES, { message: 'Please select a group type' }),
  city:      z.string().min(1, 'Please select your city'),
  goal:      z.string().optional(),
})

const step2Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     z.string().min(1, 'Email is required').email('Enter a valid email address'),
  mobile:    z.string().optional(),
  consent:   z.boolean().refine((v) => v === true, { message: 'You must agree to continue' }),
})

type Step1Values = z.infer<typeof step1Schema>
type Step2Values = z.infer<typeof step2Schema>

// ── Step 1 ─────────────────────────────────────────────────────────────────

function Step1({
  onNext,
  defaultValues,
}: {
  onNext: (data: Step1Values) => void
  defaultValues?: Partial<Step1Values>
}) {
  const [selectedType, setSelectedType] = useState<GroupType | ''>(defaultValues?.groupType ?? '')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  })

  function selectType(type: GroupType) {
    setSelectedType(type)
    setValue('groupType', type, { shouldValidate: true })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onNext)} noValidate>
      <TextField
        label="Group name"
        fullWidth
        required
        autoFocus
        placeholder="e.g. The Ngāti Pōneke Whānau"
        error={!!errors.groupName}
        helperText={errors.groupName?.message ?? '50 characters max'}
        sx={{ mb: 3 }}
        {...register('groupName')}
      />

      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
        Group type <Box component="span" sx={{ color: 'error.main' }}>*</Box>
      </Typography>
      {/* Hidden input for validation */}
      <input type="hidden" {...register('groupType')} />
      <Box
        sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: errors.groupType ? 0.5 : 3 }}
        role="group"
        aria-label="Group type"
      >
        {GROUP_TYPES.map((type) => (
          <Chip
            key={type}
            label={type}
            onClick={() => selectType(type)}
            color={selectedType === type ? 'primary' : 'default'}
            variant={selectedType === type ? 'filled' : 'outlined'}
            aria-pressed={selectedType === type}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      {errors.groupType && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }} role="alert">
          {errors.groupType.message}
        </Typography>
      )}

      <TextField
        label="Your city"
        select
        fullWidth
        required
        defaultValue={defaultValues?.city ?? ''}
        error={!!errors.city}
        helperText={errors.city?.message}
        sx={{ mb: 3 }}
        slotProps={{ select: { native: true } }}
        {...register('city')}
      >
        <option value="" disabled>Select your city</option>
        {NZ_CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </TextField>

      <TextField
        label="Donation goal per year (optional)"
        type="number"
        placeholder="e.g. 20"
        helperText="How many donations does your group want to make this year?"
        sx={{ mb: 3 }}
        slotProps={{ htmlInput: { min: 0, max: 999 } }}
        {...register('goal')}
      />

      <Button type="submit" variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} fullWidth>
        Next
      </Button>
    </Box>
  )
}

// ── Step 2 ─────────────────────────────────────────────────────────────────

function Step2({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: Step2Values) => void
  onBack: () => void
  defaultValues?: Partial<Step2Values>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2Values>({ resolver: zodResolver(step2Schema), defaultValues })

  return (
    <Box component="form" onSubmit={handleSubmit(onNext)} noValidate>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="First name"
          fullWidth required
          autoComplete="given-name"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register('firstName')}
        />
        <TextField
          label="Last name"
          fullWidth required
          autoComplete="family-name"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register('lastName')}
        />
      </Box>

      <TextField
        label="Email address"
        type="email" fullWidth required
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
        {...register('email')}
      />

      <TextField
        label="Mobile (optional)"
        type="tel" fullWidth
        autoComplete="tel"
        helperText="For session reminders via SMS"
        sx={{ mb: 2 }}
        {...register('mobile')}
      />

      <FormControlLabel
        control={<Checkbox {...register('consent')} />}
        label="I agree to receive group coordination emails from GiveRed"
        sx={{ mb: errors.consent ? 0.5 : 3, alignItems: 'flex-start' }}
      />
      {errors.consent && (
        <Typography variant="body2" color="error" sx={{ mb: 3, ml: 4 }} role="alert">
          {errors.consent.message}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="button"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          disabled={isSubmitting}
          sx={{ flex: 1 }}
        >
          {isSubmitting ? 'Creating…' : 'Create group'}
        </Button>
      </Box>
    </Box>
  )
}

// ── Step 3 — Done ──────────────────────────────────────────────────────────

const NEXT_STEPS = [
  { id: 'created',  label: 'Group created',          done: true,  action: null },
  { id: 'session',  label: 'Add your first session',  done: false, action: { label: 'Go to Sessions', href: '/dashboard' } },
  { id: 'invite',   label: 'Invite your first members', done: false, action: null },
  { id: 'book',     label: 'Book your own spot',      done: false, action: { label: 'Browse sessions', href: '/book?group=smith-whanau' } },
]

function Step3({ groupName, slug }: { groupName: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  const inviteUrl = `https://givered.nz/join/${slug}`

  function copyLink() {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <Box role="status" aria-live="polite">
      {/* Celebration */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircleIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} aria-hidden="true" />
        <Typography variant="h4" sx={{ mb: 1 }}>
          {groupName} is live!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your group is ready. Here&apos;s what to do next.
        </Typography>
      </Box>

      {/* Next steps checklist */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Your checklist</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {NEXT_STEPS.map(({ id, label, done, action }) => {
            const isInvite = id === 'invite'
            const isDone = isInvite ? copied : done
            return (
              <Box
                key={id}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 2,
                  p: 1.5, borderRadius: 2,
                  bgcolor: isDone ? '#f6fbf6' : 'background.paper',
                  border: '1px solid',
                  borderColor: isDone ? 'success.light' : 'divider',
                }}
              >
                <CheckCircleIcon
                  sx={{ fontSize: 22, color: isDone ? 'success.main' : 'text.disabled', flexShrink: 0 }}
                  aria-hidden="true"
                />
                <Typography
                  variant="body2"
                  sx={{ flex: 1, fontWeight: isDone ? 400 : 500, color: isDone ? 'text.secondary' : 'text.primary', textDecoration: isDone ? 'line-through' : 'none' }}
                >
                  {label}
                </Typography>
                {isInvite && !isDone && (
                  <Button size="small" variant="outlined" startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />} onClick={copyLink} sx={{ flexShrink: 0, fontSize: '0.75rem' }}>
                    Copy link
                  </Button>
                )}
                {action && !isDone && (
                  <Button size="small" variant="outlined" href={action.href} sx={{ flexShrink: 0, fontSize: '0.75rem' }}>
                    {action.label}
                  </Button>
                )}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Invite link */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Invite link</Typography>
        <Box
          sx={{
            p: 2, borderRadius: 2,
            backgroundColor: '#f5ddda',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            fontSize: '0.875rem',
          }}
          aria-label="Your group invite link"
        >
          {inviteUrl}
        </Box>
        {copied && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Copied — paste it into WhatsApp, email, or Slack.
          </Alert>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          onClick={copyLink}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ContentCopyIcon />}
          fullWidth
        >
          {copied ? 'Link copied!' : 'Copy invite link'}
        </Button>
        <Button href="/dashboard" variant="outlined" color="primary" fullWidth>
          Go to my dashboard
        </Button>
        <Button href="/groups/smith-whanau" variant="text" color="primary" fullWidth>
          Preview a group profile →
        </Button>
      </Box>
    </Box>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

const STEP_TITLES = [
  'Name your group',
  'Your details',
  'Done',
]

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function StartPage() {
  const [step, setStep] = useState(0)
  const [step1Data, setStep1Data] = useState<Step1Values | undefined>()
  const [createdSlug, setCreatedSlug] = useState('')

  function handleStep1(data: Step1Values) {
    setStep1Data(data)
    setStep(1)
  }

  function handleStep2(data: Step2Values) {
    // Prototype: simulate API call, then proceed
    void data
    const slug = slugify(step1Data?.groupName ?? 'my-group')
    setCreatedSlug(slug)
    setStep(2)
  }

  const progress = ((step) / 2) * 100

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{ mb: 0.5, fontWeight: 400 }}>
        {STEP_TITLES[step]}
      </Typography>
      {step < 2 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Step {step + 1} of 2
        </Typography>
      )}

      {/* Progress bar */}
      {step < 2 && (
        <LinearProgress
          variant="determinate"
          value={progress}
          aria-label={`Step ${step + 1} of 2`}
          sx={{ mb: 4, height: 6, borderRadius: 4 }}
        />
      )}

      {/* Steps */}
      {step === 0 && <Step1 onNext={handleStep1} defaultValues={step1Data} />}
      {step === 1 && (
        <Step2
          onNext={handleStep2}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && step1Data && (
        <Step3 groupName={step1Data.groupName} slug={createdSlug} />
      )}
    </Container>
  )
}
