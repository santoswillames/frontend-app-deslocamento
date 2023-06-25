import Header from '@/components/Header/Header'
import { TableData } from '@/components/Table/Table'
import {
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import { VEHICLE_GET } from '../api'
import useFetch from '@/hooks/useFetch'
import { useEffect } from 'react'

type DataVehicle = {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

const cells = ['Placa', 'Modelo', 'Ano', 'KM Autal', 'Ações']

export default function Vehicle() {
  const {
    data: dataVehicle,
    error,
    loading,
    getDataRequest,
  } = useFetch<DataVehicle[]>()

  useEffect(() => {
    function fetchClients() {
      const { url, options } = VEHICLE_GET()
      getDataRequest(url, options)
    }
    fetchClients()
  }, [getDataRequest])

  console.log(dataVehicle)

  return (
    <section>
      <Header title="Veículos" />
      <Container>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {dataVehicle && dataVehicle.length > 0 && (
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
              {dataVehicle.map((vehicle) => (
                <TableRow
                  key={vehicle?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{vehicle.placa}</TableCell>
                  <TableCell>{vehicle.marcaModelo}</TableCell>
                  <TableCell>{vehicle.anoFabricacao}</TableCell>
                  <TableCell>{vehicle.kmAtual}</TableCell>
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
        {dataVehicle && dataVehicle.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
