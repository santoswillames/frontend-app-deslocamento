import { useCallback, useState } from 'react'

function useFetch<T = unknown>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  const request = useCallback(async (url: string, options: object) => {
    let response
    let json

    try {
      setError(null)
      setLoading(true)

      response = await fetch(url, options)
      json = await response.json()
      if (response.ok === false) throw new Error(json.message)
    } catch (error) {
      const typedError = error as Error
      json = null
      setError(typedError?.message)
    } finally {
      setData(json)
      setLoading(false)
    }
    return { response, json }
  }, [])

  return {
    data,
    loading,
    error,
    request,
  }
}

export default useFetch
