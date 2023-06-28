import { Container, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

export default function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        App - Deslocamento
      </Typography>
      <Typography variant="h3">Escolha a categoria ao lado</Typography>
      <ArrowBack
        fontSize="inherit"
        color="success"
        sx={{ width: '200px', height: '200px' }}
      />
    </Container>
  )
}
