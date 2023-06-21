import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material'

export default function Vehicle() {
  return (
    <section>
      <Header title="Veículos" />
      <Container>
        <TableData />
      </Container>
    </section>
  )
}
