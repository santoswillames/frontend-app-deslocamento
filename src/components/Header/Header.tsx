import useShowFormContext from '@/context/ShowForm'
import AddButton from '../AddButton/AddButton'
import { Box, Typography, Container } from '@mui/material'
import CloseButton from '../CloseButton/CloseButton'
import { useRouter } from 'next/router'

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter()
  const { showFormState } = useShowFormContext()
  return (
    <Box component="header" sx={{ padding: '20px' }}>
      <Container
        maxWidth="lg"
        fixed={false}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {!showFormState.showForm && (
            <>
              <AddButton />
              {router.pathname === '/displacement' && <CloseButton />}
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}
