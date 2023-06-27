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
import { VEHICLE_DELETE, VEHICLE_GET } from '../api'
import useFetch from '@/hooks/useFetch'
import { useCallback, useEffect, useState } from 'react'
import useShowFormContext from '@/context/ShowForm'
import { FormVehicle } from './FormVehicle'

export type DataVehicle = {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

const cells = ['Placa', 'Modelo', 'Ano', 'KM Autal', 'Ações']

export default function Vehicle() {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { error, loading, request } = useFetch<DataVehicle[]>()

  const [dataVehicle, setDataVehicle] = useState<
    DataVehicle[] | null | undefined
  >(null)
  const [vehicle, setVehicle] = useState<DataVehicle>()

  const fetchClients = useCallback(async () => {
    const { url, options } = VEHICLE_GET()
    const data = await request(url, options)
    setDataVehicle(data)
  }, [request])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  async function deleteVehicle(id: number, name: string): Promise<void> {
    if (!confirm(`Deseja realmente excluir o registro ${name}?`)) {
      return
    }
    const { url, options } = VEHICLE_DELETE(id)
    await request(url, options)
    fetchClients()
  }

  function getVehicleForUpdate(vehicle: DataVehicle) {
    setVehicle(vehicle)
    setShowFormState({ showForm: true, titleButton: 'Atualizar' })
  }

  return (
    <section>
      <Header title="Veículos" />
      {showFormState.showForm && (
        <Container>
          <FormVehicle
            fetchVehicle={fetchClients}
            titleButton={showFormState.titleButton}
            vehicle={vehicle}
            setShowFormState={setShowFormState}
          />
        </Container>
      )}
      <Container></Container>
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
                    <Button
                      sx={{ cursor: 'pointer' }}
                      title="Editar"
                      onClick={() => getVehicleForUpdate(vehicle)}
                    >
                      <EditRounded sx={{ color: 'yellow' }} />
                    </Button>
                    <Button
                      sx={{ cursor: 'pointer' }}
                      title="Excluir"
                      onClick={() => deleteVehicle(vehicle.id, vehicle.placa)}
                    >
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
