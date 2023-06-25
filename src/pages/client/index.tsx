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
import { useEffect } from 'react'
import { CLIENT_GET } from '../api'
import { DeleteRounded, EditRounded } from '@mui/icons-material'

type DataClients = {
  id: number
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
  const {
    data: dataClients,
    error,
    loading,
    getDataRequest,
  } = useFetch<DataClients[]>()

  useEffect(() => {
    function fetchClients() {
      const { url, options } = CLIENT_GET()
      getDataRequest(url, options)
    }
    fetchClients()
  }, [getDataRequest])

  return (
    <section>
      <Header title="Cliente" />
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
                    <Button sx={{ cursor: 'pointer' }} title="Editar">
                      <EditRounded sx={{ color: 'yellow' }} />
                    </Button>
                    <Button sx={{ cursor: 'pointer' }} title="Excluir">
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
