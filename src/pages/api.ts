type CreateClient = {
  id?: number
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
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
  id?: number
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
      data: JSON.stringify(body),
    },
  }
}

export function CLIENT_PUT(id: number | undefined, body: CreateClient) {
  return {
    url: `Cliente/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function CLIENT_DELETE(id: number | undefined) {
  return {
    url: `Cliente/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id }),
    },
  }
}

export function CONDUCTOR_GET() {
  return {
    url: 'Condutor',
    options: {
      method: 'GET',
    },
  }
}

export function CONDUCTOR_POST(body: CreateConductor) {
  return {
    url: 'Condutor',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function CONDUCTOR_PUT(id: number | undefined, body: CreateConductor) {
  return {
    url: `Condutor/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function CONDUCTOR_DELETE(id: number | undefined) {
  return {
    url: `Condutor/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id }),
    },
  }
}

export function DISPLACEMENT_GET() {
  return {
    url: 'Deslocamento',
    options: {
      method: 'GET',
    },
  }
}

export function DISPLACEMENT_POST(body: CreateDisplacement) {
  return {
    url: 'Deslocamento',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function DISPLACEMENT_PUT(
  id: number | undefined,
  body: UpdateDisplacement,
) {
  return {
    url: `Deslocamento/${id}/EncerrarDeslocamento`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function DISPLACEMENT_DELETE(id: number | undefined) {
  return {
    url: `Deslocamento/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id }),
    },
  }
}

export function VEHICLE_GET() {
  return {
    url: 'Veiculo',
    options: {
      method: 'GET',
    },
  }
}

export function VEHICLE_POST(body: CreateVehicle) {
  return {
    url: 'Veiculo',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function VEHICLE_PUT(id: number | undefined, body: CreateVehicle) {
  return {
    url: `Veiculo/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  }
}

export function VEHICLE_DELETE(id: number | undefined) {
  return {
    url: `Veiculo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ id }),
    },
  }
}
