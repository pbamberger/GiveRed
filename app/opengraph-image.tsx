import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(145deg, #c0392b 0%, #8b1a10 100%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Heart mark */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 80,
            width: 140,
            height: 140,
            borderRadius: 32,
            backgroundColor: 'rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          ♥
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          GiveRed
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 400,
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          Give blood. Together.
        </div>

        {/* Sub-line */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 400,
          }}
        >
          Start or join a donation group — whānau, workplace, or community.
        </div>
      </div>
    ),
    { ...size }
  )
}
