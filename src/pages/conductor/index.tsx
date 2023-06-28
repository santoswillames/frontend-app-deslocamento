import Header from '@/components/Header/Header'
import { TableData } from '@/components/Table/Table'
import useFetch from '@/hooks/useFetch'
import {
  Button,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { CONDUCTOR_DELETE, CONDUCTOR_GET } from '../api'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import useShowFormContext from '@/context/ShowForm'
import { FormConductor } from './FormConductor'

export type DataConductor = {
  id?: number
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

const cells = ['Nome', 'Número CNH', 'Categoria CNH', 'Vencimento CNH', 'Ações']

export default function Conductor() {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { error, loading, request } = useFetch<DataConductor[]>()

  const [dataConductor, setDataConductor] = useState<
    DataConductor[] | null | undefined
  >(null)
  const [conductor, setConductor] = useState<DataConductor>()

  const fetchConductors = useCallback(async () => {
    const { url, options } = CONDUCTOR_GET()
    const data = await request(url, options)
    setDataConductor(data)
  }, [request])

  useEffect(() => {
    fetchConductors()
  }, [fetchConductors])

  async function deleteConductor(
    id: number | undefined,
    name: string,
  ): Promise<void> {
    if (!confirm(`Deseja realmente excluir o registro ${name}?`)) {
      return
    }
    const { url, options } = CONDUCTOR_DELETE(id)
    await request(url, options)
    fetchConductors()
  }

  function getConductorForUpdate(conductor: DataConductor) {
    setConductor(conductor)
    setShowFormState({ showForm: true, titleButton: 'Atualizar' })
  }

  return (
    <section>
      <Header title="Condutores" />
      {showFormState.showForm && (
        <Container>
          <FormConductor
            fetchConductors={fetchConductors}
            setShowFormState={setShowFormState}
            setConductor={setConductor}
            conductor={conductor}
          />
        </Container>
      )}
      <Container>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {dataConductor && dataConductor.length > 0 && (
          <TableData>
            <TableHead>
              <TableRow>
                {cells.map((item, index) => (
                  <TableCell
                    align={item === 'Ações' ? 'center' : 'left'}
                    key={index}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataConductor.map((conductor) => (
                <TableRow
                  key={conductor?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{conductor.nome}</TableCell>
                  <TableCell>{conductor.numeroHabilitacao}</TableCell>
                  <TableCell>{conductor.catergoriaHabilitacao}</TableCell>
                  <TableCell>{conductor.vencimentoHabilitacao}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ cursor: 'pointer' }}
                      title="Editar"
                      onClick={() => getConductorForUpdate(conductor)}
                    >
                      <EditRounded sx={{ color: 'yellow' }} />
                    </Button>
                    <Button
                      sx={{ cursor: 'pointer' }}
                      title="Excluir"
                      onClick={() =>
                        deleteConductor(conductor.id, conductor.nome)
                      }
                    >
                      <DeleteRounded sx={{ color: 'red' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableData>
        )}
        {dataConductor && dataConductor.length < 1 && <p>Não há dados!</p>}
      </Container>
    </section>
  )
}
