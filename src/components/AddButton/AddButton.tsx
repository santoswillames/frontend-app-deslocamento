import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function AddButton() {
  return (
    <Button variant="contained" startIcon={<Add />} size="large">
      Adicionar
    </Button>
  )
}
