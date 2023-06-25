import Header from '@/components/Header/Header'
import { TableData } from '@/components/Table/Table'
import {
  Button,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect } from 'react'
import { DISPLACEMENT_GET } from '../api'
import useFetch from '@/hooks/useFetch'
import { DeleteRounded, EditRounded } from '@mui/icons-material'

type DataDisplacement = {
  id: number
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: string
  fimDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

const cells = [
  'KM Inicial',
  'KM Final',
  'Inicio Deslocamento',
  'Fim Deslocamento',
  'Checklist',
  'Motivo',
  'Observação',
  'Condutor',
  'Veículo',
  'Cliente',
  'Ações',
]

export default function Displacement() {
  const {
    data: dataDisplacement,
    error,
    loading,
    getDataRequest,
  } = useFetch<DataDisplacement[]>()

  useEffect(() => {
    function fetchClients() {
      const { url, options } = DISPLACEMENT_GET()
      getDataRequest(url, options)
    }
    fetchClients()
  }, [getDataRequest])

  return (
    <section>
      <Header title="Deslocamentos" />
      <Container>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {dataDisplacement && dataDisplacement.length > 0 && (
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
              {dataDisplacement.map((displacement) => (
                <TableRow
                  key={displacement?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{displacement.kmInicial}</TableCell>
                  <TableCell>{displacement.kmFinal}</TableCell>
                  <TableCell>
                    {new Date(displacement.inicioDeslocamento).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(displacement.fimDeslocamento).toLocaleString()}
                  </TableCell>
                  <TableCell>{displacement.checkList}</TableCell>
                  <TableCell>{displacement.motivo}</TableCell>
                  <TableCell>{displacement.observacao}</TableCell>
                  <TableCell>{displacement.idCondutor}</TableCell>
                  <TableCell>{displacement.idVeiculo}</TableCell>
                  <TableCell>{displacement.idCliente}</TableCell>
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
        {dataDisplacement && dataDisplacement.length < 1 && (
          <p>Não há dados!</p>
        )}
      </Container>
    </section>
  )
}
