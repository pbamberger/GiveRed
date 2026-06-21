'use client'
import { useState, useMemo } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import GroupsSearchBar, { type SortOption } from '../../components/GroupsSearchBar'
import GroupsTypeFilter from '../../components/GroupsTypeFilter'
import GroupsResults from '../../components/GroupsResults'
import groupsData from '../../data/groups.json'
import type { Group } from '../../types'

const groups = groupsData as Group[]
const PAGE_SIZE = 9

function sortGroups(list: Group[], sort: SortOption): Group[] {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'name-asc':     return a.name.localeCompare(b.name)
      case 'name-desc':    return b.name.localeCompare(a.name)
      case 'members-desc': return b.memberCount - a.memberCount
      case 'quarter-desc': return b.quarterDonations - a.quarterDonations
      case 'total-desc':   return b.totalDonations - a.totalDonations
    }
  })
}

export default function GroupsPage() {
  const [search, setSearch]         = useState('')
  const [activeType, setActiveType] = useState('All')
  const [sort, setSort]             = useState<SortOption>('name-asc')
  const [page, setPage]             = useState(1)

  const filtered = useMemo(() => {
    const result = groups.filter((g) => {
      const matchesSearch =
        search === '' ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.city.toLowerCase().includes(search.toLowerCase())
      return matchesSearch && (activeType === 'All' || g.type === activeType)
    })
    return sortGroups(result, sort)
  }, [search, activeType, sort])

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch     = (v: string)      => { setSearch(v);     setPage(1) }
  const handleTypeChange = (v: string)      => { setActiveType(v); setPage(1) }
  const handleSort       = (v: SortOption)  => { setSort(v);       setPage(1) }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h2" component="h1" sx={{ mb: 1, fontWeight: 400 }}>
        Find a group
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Join a group near you and start donating with people you know.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <GroupsSearchBar search={search} onSearch={handleSearch} sort={sort} onSort={handleSort} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <GroupsTypeFilter activeType={activeType} onTypeChange={handleTypeChange} />
      </Box>
      <GroupsResults
        groups={paginated}
        total={filtered.length}
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </Container>
  )
}
