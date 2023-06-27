import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import useShowFormContext from '@/context/ShowForm'

export default function AddButton() {
  const { setShowFormState } = useShowFormContext()

  return (
    <Button
      variant="contained"
      startIcon={<Add />}
      size="large"
      onClick={() =>
        setShowFormState({ showForm: true, titleButton: 'Adicionar' })
      }
    >
      Adicionar
    </Button>
  )
}
