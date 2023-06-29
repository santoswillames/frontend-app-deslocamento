import { Button } from '@mui/material'
import { Check } from '@mui/icons-material'
import useShowFormContext from '@/context/ShowForm'

export default function CloseButton() {
  const { setShowFormState } = useShowFormContext()

  return (
    <Button
      variant="contained"
      startIcon={<Check />}
      size="large"
      color="warning"
      onClick={() =>
        setShowFormState({ showForm: false, titleButton: 'Atualizar' })
      }
    >
      Encerrar
    </Button>
  )
}
