import { redirect } from 'next/navigation'

// /join/[code] → /groups/[code]
// The invite code is the group slug in this prototype.
export default async function JoinPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  redirect(`/groups/${code}`)
}
