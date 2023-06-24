import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material'
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
        {dataVehicle && dataVehicle.length > 0 && <TableData />}
        {dataVehicle && dataVehicle.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
