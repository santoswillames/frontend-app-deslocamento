import * as React from 'react'
import { DataClients } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import { ShowFormContextType } from '@/context/ShowForm'

type FormClientProps = {
  client?: DataClients
  titleButton: string
  fetchClients: () => Promise<void>
  setShowFormState: (showFormState: ShowFormContextType) => void
}

export const FormClient: React.FC<FormClientProps> = ({
  client,
  titleButton,
  fetchClients,
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
          id="numeroDocumento"
          label="Número do documento"
          variant="outlined"
          name="numeroDocumento"
          type="number"
        />
        <TextField
          id="tipoDocumento"
          label="Tipo do Documento"
          variant="outlined"
          name="tipoDocumento"
        />
        <TextField id="nome" label="Nome" variant="outlined" name="nome" />
        <TextField
          id="logradouro"
          label="Logradouro"
          variant="outlined"
          name="logradouro"
        />
        <TextField
          id="numero"
          label="Número"
          variant="outlined"
          name="numero"
          type="number"
        />
        <TextField
          id="bairro"
          label="Bairro"
          variant="outlined"
          name="bairro"
        />
        <TextField
          id="cidade"
          label="Cidade"
          variant="outlined"
          name="cidade"
        />
        <TextField id="uf" label="UF" variant="outlined" name="uf" />
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
            atualizar
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
