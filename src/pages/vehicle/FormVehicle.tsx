import * as React from 'react'
import { DataVehicle } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import useShowFormContext from '@/context/ShowForm'
import useFetch from '@/hooks/useFetch'
import { VEHICLE_POST, VEHICLE_PUT } from '../api'

type FormVehicleProps = {
  vehicle?: DataVehicle
  fetchVehicle: () => Promise<void>
  setVehicle: (vehicle: DataVehicle | undefined) => void
}

export const FormVehicle: React.FC<FormVehicleProps> = ({
  vehicle,
  fetchVehicle,
  setVehicle,
}) => {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { request } = useFetch<DataVehicle[]>()

  const [formValue, setFormValue] = React.useState<DataVehicle | {}>()

  React.useEffect(() => {
    if (vehicle) setFormValue(vehicle)
    if (!vehicle) setFormValue({})
  }, [vehicle])

  function handleInputChange(event: React.FormEvent) {
    const { name, value } = event.target as HTMLInputElement
    setFormValue({ ...formValue, [name]: value })
  }

  async function addVehicle(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataVehicle: unknown = Object.fromEntries(formData)

    const { url, options } = VEHICLE_POST(dataVehicle as DataVehicle)
    const response = await request(url, options)

    if (response) {
      alert('Registro realizado com sucesso!')
    } else {
      alert('Falha ao realizar o Registro! Verifique os dados digitados.')
      return
    }

    setShowFormState({ showForm: false, titleButton: 'Adicionar' })
    fetchVehicle()
  }

  async function updateVehicle(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataVehicle: unknown = Object.fromEntries(formData)
    const dataVehicleAdd: DataVehicle = {
      id: vehicle?.id,
      ...(dataVehicle as DataVehicle),
    }

    const { url, options } = VEHICLE_PUT(vehicle?.id, dataVehicleAdd)
    const response = await request(url, options)

    // Ajustar validação, o retorno da APi mesmo certo, está retornando vazio
    // if (response) {
    //   alert('Registro realizado com sucesso!')
    // } else {
    //   alert('Falha ao realizar o Registro! Verifique os dados digitados.')
    //   return
    // }

    setShowFormState({ showForm: false, titleButton: 'Adicionar' })
    setVehicle(undefined)
    fetchVehicle()
  }

  return (
    <Box
      component="form"
      onSubmit={
        showFormState.titleButton === 'Adicionar' ? addVehicle : updateVehicle
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
          id="placa"
          label="Placa"
          variant="outlined"
          name="placa"
          onChange={handleInputChange}
          value={formValue?.placa || ''}
          disabled={showFormState.titleButton === 'Atualizar'}
        />
        <TextField
          id="marcaModelo"
          label="Marca ou Modelo"
          variant="outlined"
          name="marcaModelo"
          onChange={handleInputChange}
          value={formValue?.marcaModelo || ''}
        />
        <TextField
          id="anoFabricacao"
          label="Ano de Fabricação"
          variant="outlined"
          name="anoFabricacao"
          type="number"
          onChange={handleInputChange}
          value={formValue?.anoFabricacao || ''}
        />
        <TextField
          id="kmAtual"
          label="Km Atual"
          variant="outlined"
          name="kmAtual"
          type="number"
          onChange={handleInputChange}
          value={formValue?.kmAtual || ''}
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
            setVehicle(undefined)
            setShowFormState({ showForm: false, titleButton: 'Adicionar' })
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
