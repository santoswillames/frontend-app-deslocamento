import { Container, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

export default function Home() {
  const [value, setValue] = useState<Dayjs | null>(null)
  console.log(new Date(value?.$d).toLocaleDateString())
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* <DemoContainer components={['DatePicker']}> */}
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        label="Escolha uma data"
      />
      {/* </DemoContainer> */}

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
