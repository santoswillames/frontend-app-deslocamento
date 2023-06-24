import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import useFetch from '@/hooks/useFetch'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { CONDUCTOR_GET } from '../api'

type DataConductor = {
  id: number
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

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
        {dataConductor && dataConductor.length > 0 && <TableData />}
        {dataConductor && dataConductor.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
