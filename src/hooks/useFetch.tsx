import { useCallback, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/v1',
})

function useFetch() {
  const [data, setData] = useState<unknown | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  const request = useCallback((url: string, options?: AxiosRequestConfig) => {
    setError(null)
    setLoading(true)
    api(url, options)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return {
    request,
    data,
    loading,
    error,
  }
}

export default useFetch
