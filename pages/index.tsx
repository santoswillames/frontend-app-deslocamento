import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function Home() {
  return (
    <>
      <h1>Hello World!</h1>
      <Button variant="outlined" startIcon={<AddIcon />}>
        Adicionar
      </Button>
    </>
  )
}
