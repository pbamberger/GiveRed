import { ImageResponse } from 'next/og'
import groupsData from '../../../data/groups.json'
import type { Group } from '../../../types'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const groups = groupsData as Group[]

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = groups.find((g) => g.slug === slug)

  if (!group) {
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(145deg, #c0392b 0%, #8b1a10 100%)',
            fontFamily: 'sans-serif',
            fontSize: 48,
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          GiveRed
        </div>
      ),
      { ...size }
    )
  }

  const initials = group.name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          background: '#fffbff',
          fontFamily: 'sans-serif',
          padding: 0,
        }}
      >
        {/* Red top bar */}
        <div style={{ height: 12, background: '#b02d21', width: '100%', display: 'flex' }} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px 64px',
          }}
        >
          {/* Avatar + group name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 24,
                backgroundColor: '#b02d21',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
                fontWeight: 800,
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 56, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1 }}>
                {group.name}
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div
                  style={{
                    fontSize: 20,
                    color: '#b02d21',
                    fontWeight: 600,
                    border: '2px solid #b02d21',
                    borderRadius: 20,
                    padding: '4px 16px',
                  }}
                >
                  {group.type}
                </div>
                <div style={{ fontSize: 22, color: '#666', fontWeight: 400 }}>
                  {group.city}
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 60 }}>
            {[
              { value: String(group.totalDonations), label: 'donations' },
              { value: String(group.memberCount), label: 'members' },
              { value: String(group.quarterDonations), label: 'this quarter' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 52, fontWeight: 800, color: '#b02d21', lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: 22, color: '#666', fontWeight: 400 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 20, color: '#b02d21', fontWeight: 800 }}>♥ GiveRed</div>
            <div style={{ fontSize: 18, color: '#999' }}>givered.vercel.app</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
