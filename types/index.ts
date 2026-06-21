export interface GroupMember {
  firstName: string
  booked: boolean
}

export interface GroupSession {
  date: string
  time: string
  endTime: string
  venue: string
  suburb: string
  spotsTotal: number
  spotsTaken: number
}

export interface Group {
  id: string
  slug: string
  name: string
  type: 'Family' | 'Workplace' | 'Sports' | 'School' | 'Community' | 'Other'
  city: string
  memberCount: number
  totalDonations: number
  quarterDonations: number
  goalPerYear: number
  nextSession: GroupSession | null
  badges: string[]
  members: GroupMember[]
}

export interface Session {
  id: string
  venue: string
  address: string
  suburb: string
  city: string
  date: string
  time: string
  endTime: string
  spotsTotal: number
  spotsTaken: number
}
