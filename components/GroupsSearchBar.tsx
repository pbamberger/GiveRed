'use client'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'

export type SortOption = 'name-asc' | 'name-desc' | 'members-desc' | 'quarter-desc' | 'total-desc'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc',     label: 'Name (A–Z)' },
  { value: 'name-desc',    label: 'Name (Z–A)' },
  { value: 'members-desc', label: 'Most members' },
  { value: 'quarter-desc', label: 'Most donations this quarter' },
  { value: 'total-desc',   label: 'Most donations all time' },
]

interface GroupsSearchBarProps {
  search: string
  onSearch: (value: string) => void
  sort: SortOption
  onSort: (value: SortOption) => void
}

export default function GroupsSearchBar({ search, onSearch, sort, onSort }: GroupsSearchBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        sx={{ flexGrow: 1, minWidth: 200 }}
        placeholder="Search by name or city"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon aria-hidden="true" />
              </InputAdornment>
            ),
          },
        }}
        aria-label="Search groups"
      />
      <FormControl sx={{ minWidth: 230 }}>
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          value={sort}
          label="Sort by"
          onChange={(e) => onSort(e.target.value as SortOption)}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
