import * as React from 'react'
import Header from '@/components/Header/Header'
import { TableData } from '@/components/Table/Table'
import {
  Button,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { DISPLACEMENT_DELETE, DISPLACEMENT_GET } from '../api'
import useFetch from '@/hooks/useFetch'
import { DeleteRounded, Check } from '@mui/icons-material'
import useShowFormContext from '@/context/ShowForm'
import { FormDisplacement } from './FormDisplacement'

export type DataDisplacement = {
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

const cells = [
  'Ações',
  'KM Inicial',
  'KM Final',
  'Inicio Deslocamento',
  'Fim Deslocamento',
  'Checklist',
  'Motivo',
  'Observação',
  'Condutor',
  'Veículo',
  'Cliente',
]

export default function Displacement() {
  const { setShowFormState, showFormState } = useShowFormContext()
  const { error, loading, request } = useFetch<DataDisplacement[]>()

  const [dataDisplacement, setDataDisplacement] = useState<
    DataDisplacement[] | null | undefined
  >(null)
  const [displacement, setDisplacement] = useState<DataDisplacement>()

  const fetchDisplacements = useCallback(async () => {
    const { url, options } = DISPLACEMENT_GET()
    const data = await request(url, options)
    setDataDisplacement(data)
  }, [request])

  useEffect(() => {
    fetchDisplacements()
  }, [fetchDisplacements])

  async function deleteDisplacement(id: number): Promise<void> {
    if (!confirm(`Deseja realmente excluir o registro?`)) {
      return
    }
    const { url, options } = DISPLACEMENT_DELETE(id)
    await request(url, options)
    fetchDisplacements()
  }

  function getDisplacementForUpdate(displacement: DataDisplacement) {
    setDisplacement(displacement)
    setShowFormState({ showForm: true, titleButton: 'Atualizar' })
  }

  return (
    <section>
      <Header title="Deslocamentos" />
      {showFormState.showForm && (
        <Container>
          <FormDisplacement
            fetchDisplacements={fetchDisplacements}
            setShowFormState={setShowFormState}
            titleButton={showFormState.titleButton}
            displacement={displacement}
          />
        </Container>
      )}
      <Container>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        {dataDisplacement && dataDisplacement.length > 0 && (
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
              {dataDisplacement.map((displacement) => (
                <TableRow
                  key={displacement?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<Check />}
                        size="small"
                        color="warning"
                        sx={{ cursor: 'pointer' }}
                        title="Encerrar Deslocamento"
                        onClick={() => getDisplacementForUpdate(displacement)}
                      >
                        Encerrar
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<DeleteRounded />}
                        size="small"
                        color="error"
                        sx={{ cursor: 'pointer' }}
                        title="Excluir"
                        onClick={() => deleteDisplacement(displacement.id)}
                      >
                        Deletar
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell>{displacement.kmInicial}</TableCell>
                  <TableCell>{displacement.kmFinal}</TableCell>
                  <TableCell>
                    {new Date(displacement.inicioDeslocamento).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(displacement.fimDeslocamento).toLocaleString()}
                  </TableCell>
                  <TableCell>{displacement.checkList}</TableCell>
                  <TableCell>{displacement.motivo}</TableCell>
                  <TableCell>{displacement.observacao}</TableCell>
                  <TableCell>{displacement.idCondutor}</TableCell>
                  <TableCell>{displacement.idVeiculo}</TableCell>
                  <TableCell>{displacement.idCliente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableData>
        )}
        {dataDisplacement && dataDisplacement.length < 1 && (
          <p>Não há dados!</p>
        )}
      </Container>
    </section>
  )
}
