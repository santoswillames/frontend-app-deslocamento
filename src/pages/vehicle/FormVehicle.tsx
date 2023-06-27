import * as React from 'react'
import { DataVehicle } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import { ShowFormContextType } from '@/context/ShowForm'

type FormVehicleProps = {
  vehicle?: DataVehicle
  titleButton: string
  fetchVehicle: () => Promise<void>
  setShowFormState: (showFormState: ShowFormContextType) => void
}

export const FormVehicle: React.FC<FormVehicleProps> = ({
  vehicle,
  titleButton,
  fetchVehicle,
  setShowFormState,
}) => {
  return (
    <Box
      component="form"
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
        <TextField id="placa" label="Placa" variant="outlined" name="placa" />
        <TextField
          id="marcaModelo"
          label="Marca ou Modelo"
          variant="outlined"
          name="marcaModelo"
        />
        <TextField
          id="anoFabricacao"
          label="Ano de Fabricação"
          variant="outlined"
          name="anoFabricacao"
          type="number"
        />
        <TextField
          id="kmAtual"
          label="Km Atual"
          variant="outlined"
          name="kmAtual"
          type="number"
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
        {titleButton === 'Adicionar' ? (
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
          onClick={() =>
            setShowFormState({ showForm: false, titleButton: 'Adicionar' })
          }
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
