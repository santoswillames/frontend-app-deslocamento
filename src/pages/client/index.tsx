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
  const { data: dataClients, error, loading, request } = useFetch()

  useEffect(() => {
    function fetchClients() {
      const { url, options } = CLIENT_GET()
      request(url, options)
    }
    fetchClients()
  }, [request])

  console.log(dataClients)

  return (
    <section>
      <Header title="Cliente" />
      <Container>
        <TableData />
      </Container>
    </section>
  )
}
