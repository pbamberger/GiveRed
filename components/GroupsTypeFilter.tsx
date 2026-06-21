'use client'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

export const GROUP_TYPES = ['All', 'Family', 'Workplace', 'Sports', 'School', 'Community', 'Other'] as const

interface GroupsTypeFilterProps {
  activeType: string
  onTypeChange: (type: string) => void
}

export default function GroupsTypeFilter({ activeType, onTypeChange }: GroupsTypeFilterProps) {
  return (
    <Box
      sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
      role="group"
      aria-label="Filter by group type"
    >
      {GROUP_TYPES.map((type) => (
        <Chip
          key={type}
          label={type}
          onClick={() => onTypeChange(type)}
          color={activeType === type ? 'primary' : 'default'}
          variant={activeType === type ? 'filled' : 'outlined'}
          aria-pressed={activeType === type}
        />
      ))}
    </Box>
  )
}
