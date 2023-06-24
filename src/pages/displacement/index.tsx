import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { DISPLACEMENT_GET } from '../api'
import useFetch from '@/hooks/useFetch'

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
        {dataDisplacement && dataDisplacement.length > 0 && <TableData />}
        {dataDisplacement && dataDisplacement.length < 1 && (
          <p>Não há dados!</p>
        )}
      </Container>
    </section>
  )
}
