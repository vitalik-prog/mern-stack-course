import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./auth.hook";

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {logout} = useAuth()
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something wrong')
      }
      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  useEffect(() => {
    if (error === 'Unauthorized') {
      logout()
    }
  }, [error, logout])

  return { loading, request, error, clearError }
}
