import * as React from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

type TableProps = {
  children: React.ReactNode
}

export const TableData: React.FC<TableProps> = ({ children }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {children}
      </Table>
    </TableContainer>
  )
}
