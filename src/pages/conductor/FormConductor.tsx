import * as React from 'react'
import { DataConductor } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import { ShowFormContextType } from '@/context/ShowForm'

type FormConductorProps = {
  conductor?: DataConductor
  titleButton: string
  fetchConductors: () => Promise<void>
  setShowFormState: (showFormState: ShowFormContextType) => void
}

export const FormConductor: React.FC<FormConductorProps> = ({
  conductor,
  titleButton,
  fetchConductors,
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
        <TextField id="nome" label="Nome" variant="outlined" name="nome" />

        <TextField
          id="numeroHabilitacao"
          label="Número CNH"
          variant="outlined"
          name="numeroHabilitacao"
          type="number"
        />
        <TextField
          id="catergoriaHabilitacao"
          label="Categoria da CNH"
          variant="outlined"
          name="catergoriaHabilitacao"
        />
        <TextField
          id="vencimentoHabilitacao"
          label="Vencimento da CNH"
          variant="outlined"
          name="vencimentoHabilitacao"
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
