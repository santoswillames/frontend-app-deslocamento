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

type AddClient = Omit<DataClients, 'id'>

export const FormClient: React.FC<FormClientProps> = ({
  client,
  titleButton,
  fetchClients,
  setShowFormState,
}) => {
  const [dataClientUpdate, setDataClientUpdate] = React.useState<
    DataClients | {}
  >({})
  const [formValue, setFormValue] = React.useState<
    AddClient | DataClients | {}
  >(dataClientUpdate)

  React.useEffect(() => {
    if (client) setDataClientUpdate(client)
  }, [client])

  function handleInputChange(event: React.FormEvent) {
    const { name, value } = event.target as HTMLInputElement
    setFormValue({ ...formValue, [name]: value })
  }

  async function addClient(event: React.FormEvent) {
    event.preventDefault()
    console.log(new FormData(event.target as HTMLFormElement))
    const formData = new FormData(event.target as HTMLFormElement)
    const dataClientAdd = Object.fromEntries(formData)
    console.log(dataClientAdd)
  }

  async function updateClient(event: React.FormEvent) {
    event.preventDefault()
  }

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
          id="numeroDocumento"
          label="Número do documento"
          variant="outlined"
          name="numeroDocumento"
          type="number"
          onChange={handleInputChange}
          value={formValue?.numeroDocumento || ''}
        />
        <TextField
          id="tipoDocumento"
          label="Tipo do Documento"
          variant="outlined"
          name="tipoDocumento"
          onChange={handleInputChange}
          value={formValue?.tipoDocumento || ''}
        />
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          name="nome"
          onChange={handleInputChange}
          value={formValue?.nome || ''}
        />
        <TextField
          id="logradouro"
          label="Logradouro"
          variant="outlined"
          name="logradouro"
          onChange={handleInputChange}
          value={formValue?.logradouro || ''}
        />
        <TextField
          id="numero"
          label="Número"
          variant="outlined"
          name="numero"
          type="number"
          onChange={handleInputChange}
          value={formValue?.numero || ''}
        />
        <TextField
          id="bairro"
          label="Bairro"
          variant="outlined"
          name="bairro"
          onChange={handleInputChange}
          value={formValue?.bairro || ''}
        />
        <TextField
          id="cidade"
          label="Cidade"
          variant="outlined"
          name="cidade"
          onChange={handleInputChange}
          value={formValue?.cidade || ''}
        />
        <TextField
          id="uf"
          label="UF"
          variant="outlined"
          name="uf"
          onChange={handleInputChange}
          value={formValue?.uf || ''}
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
            onClick={(event) => addClient(event)}
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
            onClick={(event) => updateClient(event)}
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
