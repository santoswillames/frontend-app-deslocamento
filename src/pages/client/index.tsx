import Header from '@/components/Header/Header'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material'

export default function Client() {
  return (
    <section>
      <Header title="Cliente" />
      <Container>
        <TableData />
      </Container>
    </section>
  )
}
