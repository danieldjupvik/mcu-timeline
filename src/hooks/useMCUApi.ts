import { AxiosRequestConfig } from 'axios'
import { useQuery } from 'react-query'

import { api } from '../data/api'
import { MCUApiResponse } from '../types/api'

interface ApiResponse<T> {
  data: T
}

export const useMCUApi = (endpoint: string, options?: AxiosRequestConfig) => {
  const queryKey = `mcu-api-${endpoint}`
  const fetchData = async (): Promise<MCUApiResponse[]> => {
    const response = await api.get<ApiResponse<MCUApiResponse[]>>(endpoint.toLowerCase(), options)
    return response.data.data
  }

  const { data, isLoading, isError, error, refetch } = useQuery<
    MCUApiResponse[]
  >(queryKey, fetchData)

  return { data, isLoading, isError, error, refetch }
}
