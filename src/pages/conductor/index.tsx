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
import { CONDUCTOR_GET } from '../api'
import { DeleteRounded, EditRounded } from '@mui/icons-material'

type DataConductor = {
  id: number
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

const cells = ['Nome', 'Número CNH', 'Categoria CNH', 'Vencimento CNH', 'Ações']

export default function Conductor() {
  const {
    data: dataConductor,
    error,
    loading,
    getDataRequest,
  } = useFetch<DataConductor[]>()

  useEffect(() => {
    function fetchClients() {
      const { url, options } = CONDUCTOR_GET()
      getDataRequest(url, options)
    }
    fetchClients()
  }, [getDataRequest])

  return (
    <section>
      <Header title="Condutores" />
      <Container>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {dataConductor && dataConductor.length > 0 && (
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
              {dataConductor.map((conductor) => (
                <TableRow
                  key={conductor?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{conductor.nome}</TableCell>
                  <TableCell>{conductor.numeroHabilitacao}</TableCell>
                  <TableCell>{conductor.catergoriaHabilitacao}</TableCell>
                  <TableCell>{conductor.vencimentoHabilitacao}</TableCell>
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
        {dataConductor && dataConductor.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
