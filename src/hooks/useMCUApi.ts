import { useQuery } from 'react-query'
import { api } from '../data/api'

export interface MCUApiResponse {
  id: number
  title: string
  release_date: string
  last_aired_date?: string
  box_office?: string
  duration?: number
  number_episodes?: number
  overview: string
  cover_url: string
  trailer_url?: string
  directed_by: string
  phase: number
  saga: string
  chronology?: number
  post_credit_scenes?: number
  imdb_id: string
}

export const useMCUApi = (endpoint: string, options?: any) => {
  const queryKey = `mcu-api-${endpoint}`
  const fetchData = async () => {
    const response = await api.get(endpoint.toLowerCase(), options)
    return response.data.data
  }

  const { data, isLoading, isError, error, refetch } = useQuery<
    MCUApiResponse[]
  >(queryKey, fetchData, {
    cacheTime: 0,
    retry: false,
    refetchOnWindowFocus: false
  })

  return { data, isLoading, isError, error, refetch }
}
