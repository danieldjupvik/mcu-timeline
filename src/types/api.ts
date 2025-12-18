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
