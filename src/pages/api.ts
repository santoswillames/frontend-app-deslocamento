type CreateClient = {
  id?: number
  numeroDocumento: 'string'
  tipoDocumento: 'string'
  nome: 'string'
  logradouro: 'string'
  numero: 'string'
  bairro: 'string'
  cidade: 'string'
  uf: 'string'
}

type CreateConductor = {
  id?: number
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

type CreateDisplacement = {
  kmInicial: number
  inicioDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

type UpdateDisplacement = {
  id: number
  kmFinal: number
  fimDeslocamento: string
  observacao: string
}

type CreateVehicle = {
  id?: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export function CLIENT_GET() {
  return {
    url: 'Cliente',
    options: {
      method: 'GET',
    },
  }
}

export function CLIENT_POST(body: CreateClient) {
  return {
    url: 'Cliente',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  }
}

export function CLIENT_PUT(id: number, body: CreateClient) {
  return {
    url: `Cliente/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  }
}

export function CLIENT_DELETE(id: number) {
  return {
    url: `Cliente/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    },
  }
}
