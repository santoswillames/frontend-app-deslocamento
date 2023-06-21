import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material'

export default function Conductor() {
  return (
    <section>
      <Header title="Condutores" />
      <Container>
        <TableData />
      </Container>
    </section>
  )
}
