import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import useFetch from '@/hooks/useFetch'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { CLIENT_GET } from '../api'

type DataClients = {
  id: number
  numeroDocumento: 'string'
  tipoDocumento: 'string'
  nome: 'string'
  logradouro: 'string'
  numero: 'string'
  bairro: 'string'
  cidade: 'string'
  uf: 'string'
}

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
        {dataClients && dataClients.length > 0 && <TableData />}
        {dataClients && dataClients.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
