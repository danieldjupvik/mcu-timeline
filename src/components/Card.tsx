import { MCUApiResponse } from '../hooks/useMCUApi'
import styled from 'styled-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Card = ({
  title,
  cover_url,
  release_date,
  phase,
  type,
  imdb_id
}: MCUApiResponse & { type: string }) => {
  const { t } = useTranslation()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const isInTheater = (release_date: string): boolean => {
    const releaseDate = new Date(release_date)
    const currentDate = new Date()

    const twelveWeeksAgo = new Date()
    twelveWeeksAgo.setDate(currentDate.getDate() - 84) // 12 weeks ago

    return releaseDate <= currentDate && releaseDate >= twelveWeeksAgo
  }

  const formattedDate = release_date
    ? new Date(release_date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : t('unknown')

  const openUrl = () =>
    imdb_id && window.open(`https://imdb.com/title/${imdb_id}`, '_blank')

  return (
    <Content onClick={openUrl}>
      <Image
        src={cover_url}
        onLoad={handleImageLoad}
        isImageLoaded={isImageLoaded}
      />
      {type === 'movies' && isInTheater(release_date) && (
        <InTheaterLogo> {t('inTheater')}</InTheaterLogo>
      )}
      <Wrapper>
        <Title>{title}</Title>
        <Row>
          <Left>{t('date')}:</Left>
          <div>{formattedDate}</div>
        </Row>
        <Row>
          <Left>{t('phase')}:</Left>
          <div>{phase ?? t('unknown')}</div>
        </Row>
      </Wrapper>
    </Content>
  )
}

const Content = styled.div`
  max-width: 200px;
  display: flex;
  border: 1px solid white;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: black;
  position: relative;
  cursor: pointer;
`
const Image = styled.img<{ isImageLoaded: boolean }>`
  width: 100%;
  height: 297px;
  object-fit: cover;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  opacity: ${({ isImageLoaded }) => (isImageLoaded ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`

const Wrapper = styled.div`
  padding: 20px 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
  align-items: center;
`

const Title = styled.div`
  font-family: 'Bangers', cursive;
  letter-spacing: 1px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 150px;
`

const Left = styled.div`
  font-weight: 600;
`

const InTheaterLogo = styled.div`
  position: absolute;
  top: 2px;
  right: -26px;
  font-size: 16px;
  font-weight: bold;
  background-color: rgb(248, 180, 0);
  color: rgb(51, 51, 51);
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  clip-path: polygon(0px 0px, 100% 0px, 90% 100%, 10% 100%);
  transform: rotate(10deg);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px;
`
