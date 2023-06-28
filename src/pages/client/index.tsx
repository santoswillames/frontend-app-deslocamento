import Header from '@/components/Header/Header'
import { TableData } from '@/components/Table/Table'
import useFetch from '@/hooks/useFetch'
import {
  Button,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useCallback, useState } from 'react'
import { CLIENT_DELETE, CLIENT_GET } from '../api'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import useShowFormContext from '@/context/ShowForm'
import { FormClient } from './FormClient'

export type DataClients = {
  id?: number
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

const cells = [
  'Num. Documento',
  'Tipo Documento',
  'Nome',
  'Logradouro',
  'Número',
  'Bairro',
  'Cidade',
  'UF',
  'Ações',
]

export default function Client() {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { error, loading, request } = useFetch<DataClients[]>()

  const [dataClients, setDataClients] = useState<
    DataClients[] | null | undefined
  >(null)
  const [client, setClient] = useState<DataClients>()

  const fetchClients = useCallback(async () => {
    const { url, options } = CLIENT_GET()
    const data = await request(url, options)
    setDataClients(data)
  }, [request])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  async function deleteClient(
    id: number | undefined,
    name: string,
  ): Promise<void> {
    if (!confirm(`Deseja realmente excluir o registro ${name}?`)) {
      return
    }
    const { url, options } = CLIENT_DELETE(id)
    await request(url, options)
    fetchClients()
  }

  function getClientForUpdate(client: DataClients) {
    setClient(client)
    setShowFormState({ showForm: true, titleButton: 'Atualizar' })
  }

  return (
    <section>
      <Header title="Cliente" />
      {showFormState.showForm && (
        <Container>
          <FormClient
            fetchClients={fetchClients}
            setShowFormState={setShowFormState}
            client={client}
            setClient={setClient}
          />
        </Container>
      )}
      <Container>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {dataClients && dataClients.length > 0 && (
          <TableData>
            <TableHead>
              <TableRow>
                {cells.map((item, index) => (
                  <TableCell
                    align={item === 'Ações' ? 'center' : 'left'}
                    key={index}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataClients.map((client) => (
                <TableRow
                  key={client?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{client.numeroDocumento}</TableCell>
                  <TableCell>{client.tipoDocumento}</TableCell>
                  <TableCell>{client.nome}</TableCell>
                  <TableCell>{client.logradouro}</TableCell>
                  <TableCell>{client.numero}</TableCell>
                  <TableCell>{client.bairro}</TableCell>
                  <TableCell>{client.cidade}</TableCell>
                  <TableCell>{client.uf}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ cursor: 'pointer' }}
                      title="Editar"
                      onClick={() => getClientForUpdate(client)}
                    >
                      <EditRounded sx={{ color: 'yellow' }} />
                    </Button>
                    <Button
                      sx={{ cursor: 'pointer' }}
                      title="Excluir"
                      onClick={() => deleteClient(client.id, client.nome)}
                    >
                      <DeleteRounded sx={{ color: 'red' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableData>
        )}
        {dataClients && dataClients.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
