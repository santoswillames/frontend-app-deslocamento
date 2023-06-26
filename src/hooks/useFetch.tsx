import { useCallback, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/v1',
})

function useFetch<T = unknown>() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  const request = useCallback(
    async (
      url: string,
      options?: AxiosRequestConfig,
    ): Promise<T | null | undefined> => {
      let data
      setError(null)
      setLoading(true)
      await api(url, options)
        .then((response) => {
          data = response.data
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))

      return data
    },
    [],
  )

  return {
    request,
    loading,
    error,
  }
}

export default useFetch
