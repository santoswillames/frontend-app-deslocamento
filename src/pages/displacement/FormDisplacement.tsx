import * as React from 'react'
import { DataDisplacement } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import { ShowFormContextType } from '@/context/ShowForm'

type FormDisplacementProps = {
  displacement?: DataDisplacement
  titleButton: string
  fetchDisplacements: () => Promise<void>
  setShowFormState: (showFormState: ShowFormContextType) => void
}

export const FormDisplacement: React.FC<FormDisplacementProps> = ({
  displacement,
  titleButton,
  fetchDisplacements,
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
        <TextField
          id="kmInicial"
          label="KM Inicial"
          variant="outlined"
          name="kmInicial"
          type="number"
        />
        <TextField
          id="kmFinal"
          label="Km Final"
          variant="outlined"
          name="kmFinal"
          type="number"
        />
        <TextField
          id="inicioDeslocamento"
          label="Inicio do deslocamento"
          variant="outlined"
          name="inicioDeslocamento"
        />
        <TextField
          id="fimDeslocamento"
          label="Fim do deslocamento"
          variant="outlined"
          name="fimDeslocamento"
        />
        <TextField
          id="checkList"
          label="Checklist"
          variant="outlined"
          name="checkList"
        />
        <TextField
          id="motivo"
          label="Motivo"
          variant="outlined"
          name="motivo"
        />
        <TextField
          id="observacao"
          label="Observação"
          variant="outlined"
          name="observacao"
        />
        <TextField
          id="idCondutor"
          label="Condutor"
          variant="outlined"
          name="idCondutor"
        />
        <TextField
          id="idVeiculo"
          label="Veículo"
          variant="outlined"
          name="idVeiculo"
        />
        <TextField
          id="idCliente"
          label="Cliente"
          variant="outlined"
          name="idCliente"
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
