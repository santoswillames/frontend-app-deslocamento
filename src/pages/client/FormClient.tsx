import * as React from 'react'
import { DataClients } from '.'
import { Box, TextField, Button } from '@mui/material'
import { SaveRounded, ClearRounded, EditRounded } from '@mui/icons-material'
import useShowFormContext, { ShowFormContextType } from '@/context/ShowForm'
import { CLIENT_POST, CLIENT_PUT } from '../api'
import useFetch from '@/hooks/useFetch'

type FormClientProps = {
  client?: DataClients
  fetchClients: () => Promise<void>
  setShowFormState: (showFormState: ShowFormContextType) => void
  setClient: (client: DataClients | undefined) => void
}

export const FormClient: React.FC<FormClientProps> = ({
  client,
  fetchClients,
  setClient,
}) => {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { request } = useFetch<DataClients[]>()

  const [formValue, setFormValue] = React.useState<DataClients | {}>()

  React.useEffect(() => {
    if (client) setFormValue(client)
    if (!client) setFormValue({})
  }, [client])

  function handleInputChange(event: React.FormEvent) {
    const { name, value } = event.target as HTMLInputElement
    setFormValue({ ...formValue, [name]: value })
  }

  async function addClient(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataClientAdd: unknown = Object.fromEntries(formData)
    const { url, options } = CLIENT_POST(dataClientAdd as DataClients)
    const response = await request(url, options)

    setShowFormState({ showForm: false, titleButton: 'Adicionar' })
    fetchClients()
  }

  async function updateClient(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataClient: unknown = Object.fromEntries(formData)
    const dataClientAdd: DataClients = {
      ...(dataClient as DataClients),
      id: client?.id,
    }

    const { url, options } = CLIENT_PUT(client?.id, dataClientAdd)
    const response = await request(url, options)

    setShowFormState({ showForm: false, titleButton: 'Adicionar' })
    setClient(undefined)
    fetchClients()
  }

  return (
    <Box
      component="form"
      onSubmit={
        showFormState.titleButton === 'Adicionar' ? addClient : updateClient
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
          id="numeroDocumento"
          label="Número do documento"
          variant="outlined"
          name="numeroDocumento"
          type="number"
          onChange={handleInputChange}
          value={formValue?.numeroDocumento || ''}
          disabled={showFormState.titleButton === 'Atualizar'}
        />
        <TextField
          id="tipoDocumento"
          label="Tipo do Documento"
          variant="outlined"
          name="tipoDocumento"
          onChange={handleInputChange}
          value={formValue?.tipoDocumento || ''}
          disabled={showFormState.titleButton === 'Atualizar'}
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
            atualizar
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<ClearRounded />}
          size="large"
          color="error"
          onClick={() => {
            setClient(undefined)
            setShowFormState({ showForm: false, titleButton: 'Adicionar' })
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
