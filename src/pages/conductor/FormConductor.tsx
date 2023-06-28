import * as React from 'react'
import { DataConductor } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import useShowFormContext, { ShowFormContextType } from '@/context/ShowForm'
import useFetch from '@/hooks/useFetch'
import { CONDUCTOR_POST, CONDUCTOR_PUT } from '../api'

type FormConductorProps = {
  conductor?: DataConductor
  fetchConductors: () => Promise<void>
  setShowFormState: (showFormState: ShowFormContextType) => void
  setConductor: (conductor: DataConductor | undefined) => void
}

export const FormConductor: React.FC<FormConductorProps> = ({
  conductor,
  fetchConductors,
  setConductor,
}) => {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { request } = useFetch<DataConductor[]>()

  const [formValue, setFormValue] = React.useState<DataConductor | {}>()

  React.useEffect(() => {
    if (conductor) setFormValue(conductor)
    if (!conductor) setFormValue({})
  }, [conductor])

  function handleInputChange(event: React.FormEvent) {
    const { name, value } = event.target as HTMLInputElement
    setFormValue({ ...formValue, [name]: value })
  }

  async function addConductor(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataConductorAdd: unknown = Object.fromEntries(formData)

    const test = date.toISOString()
    console.log(date, test)

    const { url, options } = CONDUCTOR_POST(dataConductorAdd as DataConductor)
    const response = await request(url, options)

    setShowFormState({ showForm: false, titleButton: 'Adicionar' })
    fetchConductors()
  }

  async function updateConductor(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataConductor: unknown = Object.fromEntries(formData)
    const dataConductorAdd: DataConductor = {
      ...(dataConductor as DataConductor),
      id: conductor?.id,
    }

    const { url, options } = CONDUCTOR_PUT(conductor?.id, dataConductorAdd)
    const response = await request(url, options)

    setShowFormState({ showForm: false, titleButton: 'Adicionar' })
    fetchConductors()
  }

  return (
    <Box
      component="form"
      onSubmit={
        showFormState.titleButton === 'Adicionar'
          ? addConductor
          : updateConductor
      }
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexDirection: 'column',
        marginBottom: '12px',
        padding: '0 0 8px 0',
        borderBottom: '1px solid rgb(182, 182, 182)',
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 4,
          width: '100%',
        }}
      >
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          name="nome"
          onChange={handleInputChange}
          value={formValue?.nome || ''}
          disabled={showFormState.titleButton === 'Atualizar'}
        />

        <TextField
          id="numeroHabilitacao"
          label="Número CNH"
          variant="outlined"
          name="numeroHabilitacao"
          type="number"
          onChange={handleInputChange}
          value={formValue?.numeroHabilitacao || ''}
          disabled={showFormState.titleButton === 'Atualizar'}
        />
        <TextField
          id="catergoriaHabilitacao"
          label="Categoria da CNH"
          variant="outlined"
          name="catergoriaHabilitacao"
          onChange={handleInputChange}
          value={formValue?.catergoriaHabilitacao || ''}
        />

        <TextField
          id="vencimentoHabilitacao"
          label="Vencimento da CNH"
          variant="outlined"
          name="vencimentoHabilitacao"
          onChange={handleInputChange}
          value={formValue?.vencimentoHabilitacao || ''}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 4,
          width: '100%',
        }}
      >
        {showFormState.titleButton === 'Adicionar' ? (
          <Button
            variant="contained"
            startIcon={<SaveRounded />}
            size="large"
            color="success"
            type="submit"
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditRounded />}
            size="large"
            type="submit"
            color="secondary"
          >
            Atualizar
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<ClearRounded />}
          size="large"
          color="error"
          onClick={() => {
            setConductor(undefined)
            setShowFormState({ showForm: false, titleButton: 'Adicionar' })
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
