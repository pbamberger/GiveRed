'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import GroupsIcon from '@mui/icons-material/Groups'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import HomeIcon from '@mui/icons-material/Home'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import Link from 'next/link'

const HOW_IT_WORKS = [
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />,
    step: '1',
    title: 'Start or join a group',
    body: 'Create a group for your whānau, workplace, or club — or join one your friend has started. Anyone can be a champion.',
  },
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />,
    step: '2',
    title: 'Book a session together',
    body: 'Your group coordinator picks a session and invites everyone. You each confirm your own spot in seconds.',
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />,
    step: '3',
    title: 'Donate and track your impact',
    body: 'Every donation counts toward your group total. Watch your tally grow and earn badges along the way.',
  },
]

const WHO_FOR = [
  {
    icon: <HomeIcon sx={{ fontSize: 32, color: 'primary.main' }} aria-hidden="true" />,
    type: 'Whānau',
    body: 'Turn a family obligation into a shared tradition. Keep each other accountable across generations.',
    href: '/groups?type=Wh%C4%81nau',
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 32, color: 'primary.main' }} aria-hidden="true" />,
    type: 'Workplace',
    body: 'A team that gives together builds something that goes beyond the office. Easy to organise, easy to track.',
    href: '/groups?type=Workplace',
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 32, color: 'primary.main' }} aria-hidden="true" />,
    type: 'Community',
    body: 'Sports clubs, faith groups, neighbourhoods — anyone with a shared identity and a desire to give back.',
    href: '/groups?type=Community',
  },
]

const TESTIMONIALS = [
  {
    quote: 'We started as a team of four. Eight months later we have nineteen members and we\'ve just hit 50 donations. It\'s become something people genuinely look forward to.',
    name: 'Aroha',
    location: 'Auckland',
    type: 'Workplace group',
    initials: 'AW',
  },
  {
    quote: 'My dad had a blood transfusion last year. That\'s when I realised I needed to do something. Our whānau now donates together every quarter — it means a lot to all of us.',
    name: 'Tama',
    location: 'Hamilton',
    type: 'Whānau group',
    initials: 'TH',
  },
  {
    quote: 'I was nervous about donating for the first time. Doing it with people from my club made all the difference. We were in and out in an hour and celebrated with coffee after.',
    name: 'Priya',
    location: 'Wellington',
    type: 'Community group',
    initials: 'PW',
  },
]

const STATS = [
  { value: '48',    label: 'Groups across NZ' },
  { value: '1,240', label: 'Donations this year' },
  { value: '12',    label: 'Cities and towns' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(160deg, #fff8f7 0%, #ffdad5 100%)',
          py: { xs: 8, sm: 12 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="sm" disableGutters>
          <Stack sx={{ gap: 4, alignItems: { xs: 'center', sm: 'flex-start' } }}>
            <Box>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem' },
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: 'text.primary',
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                Give blood.
                <br />
                Together.
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                maxWidth: 440,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Start or join a group with your whānau, workmates, or community — and make
              donating a regular habit that fits your life.
            </Typography>

            <Stack
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Button
                component={Link}
                href="/groups"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ minWidth: 160 }}
              >
                Find a group
              </Button>
              <Button
                component={Link}
                href="/start"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ minWidth: 160 }}
              >
                Start a group
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* How it works */}
      <Box sx={{ py: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="md" disableGutters>
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 6, textAlign: 'center', fontWeight: 400 }}
          >
            How it works
          </Typography>

          <Stack
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
            }}
          >
            {HOW_IT_WORKS.map((item) => (
              <Box
                key={item.step}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  maxWidth: { md: 260 },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 1.5, fontWeight: 500 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.body}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Who is it for? */}
      <Box sx={{ py: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 }, backgroundColor: '#fff8f7' }}>
        <Container maxWidth="md" disableGutters>
          <Typography variant="h2" component="h2" sx={{ mb: 2, textAlign: 'center', fontWeight: 400 }}>
            Who is it for?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: 'center', maxWidth: 480, mx: 'auto' }}>
            Any group with a shared identity can become a blood donation group. Here are the three most common shapes.
          </Typography>
          <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {WHO_FOR.map(({ icon, type, body, href }) => (
              <Card
                key={type}
                component={Link}
                href={href}
                elevation={0}
                sx={{
                  flex: 1,
                  p: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'box-shadow 0.15s',
                  '&:hover': { boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 1.5 }}>{icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Stats bar */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          py: { xs: 5, sm: 6 },
          px: { xs: 2, sm: 3 },
          borderRadius: 0,
        }}
      >
        <Container maxWidth="md" disableGutters>
          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 4, sm: 0 },
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {STATS.map((stat) => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  component="p"
                  sx={{ color: '#ffffff', fontWeight: 700, lineHeight: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Paper>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="md" disableGutters>
          <Typography variant="h2" component="h2" sx={{ mb: 2, textAlign: 'center', fontWeight: 400 }}>
            From the community
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 6, textAlign: 'center' }}>
            Illustrative quotes — what group members tell us
          </Typography>
          <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {TESTIMONIALS.map(({ quote, name, location, type, initials }) => (
              <Card key={name} elevation={0} sx={{ flex: 1, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography
                    variant="body1"
                    sx={{ flex: 1, mb: 3, fontStyle: 'italic', lineHeight: 1.7, color: 'text.secondary' }}
                  >
                    &ldquo;{quote}&rdquo;
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.8rem', fontWeight: 700 }}>
                      {initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{name}, {location}</Typography>
                      <Typography variant="caption" color="text.secondary">{type}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CTA band */}
      <Box sx={{ py: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 }, textAlign: 'center' }}>
        <Container maxWidth="sm" disableGutters>
          <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 400 }}>
            Ready to make a difference?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            It takes less than five minutes to start a group. Your first donation session
            could save up to three lives.
          </Typography>
          <Button
            component={Link}
            href="/start"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Start your group today
          </Button>
        </Container>
      </Box>
    </>
  )
}
