import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material'

export default function Displacement() {
  return (
    <section>
      <Header title="Deslocamentos" />
      <Container>
        <TableData />
      </Container>
    </section>
  )
}
