import moment from 'moment'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { MCUApiResponse } from '../hooks/useMCUApi'

export const Card = ({
  title,
  cover_url,
  release_date,
  phase,
  type,
  imdb_id,
  index,
  array,
  isImageLoaded,
  setIsImageLoaded
}: MCUApiResponse & {
  type: string
  index: number
  array: MCUApiResponse[]
  isImageLoaded: boolean
  setIsImageLoaded: (value: boolean) => void
}) => {
  const { t } = useTranslation()
  const releaseDate = moment(release_date)
  const currentDate = moment()

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const isInTheater = (release_date: string): boolean => {
    const releaseDate = moment(release_date)

    const subtractedDate = moment().subtract(9, 'weeks')

    return (
      releaseDate.isSameOrBefore(currentDate) &&
      releaseDate.isSameOrAfter(subtractedDate)
    )
  }

  const formattedDate = release_date
    ? new Date(release_date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : t('unknown')

  const isReleaseDateInFuture = releaseDate.isSameOrAfter(currentDate)

  const openUrl = () =>
    imdb_id && window.open(`https://imdb.com/title/${imdb_id}`, '_blank')

  const nextShowAiring = (value: string) => {
    const lastAiredDate = value
    if (!lastAiredDate) return false
    const date = new Date(lastAiredDate)
    return date >= new Date()
  }

  return (
    <>
      <Content
        onClick={openUrl}
        id={
          isInTheater(release_date) || nextShowAiring(release_date)
            ? 'active'
            : ''
        }
        isImageLoaded={isImageLoaded}
      >
        <Image
          src={cover_url}
          onLoad={handleImageLoad}
          isImageLoaded={isImageLoaded}
        />
        {type === 'movies' && isInTheater(release_date) && (
          <InTheaterLogo isImageLoaded={isImageLoaded}>
            {t('inTheater')}
          </InTheaterLogo>
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
          {isReleaseDateInFuture && (
            <Row>
              <div style={{ textAlign: 'center', width: '100%' }}>
                {t('days_until', {
                  days: releaseDate.diff(currentDate, 'days')
                })}
              </div>
            </Row>
          )}
        </Wrapper>
      </Content>
      {index !== array.length - 1 && (
        <VerticalLine isImageLoaded={isImageLoaded} />
      )}
    </>
  )
}

const applyFadeInAnimation = (isImageLoaded: boolean, duration: string) => css`
  opacity: ${isImageLoaded ? '1' : '0'};
  transition: opacity ${duration} ease-in-out;
`

const Content = styled.div<{ isImageLoaded: boolean }>`
  max-width: 200px;
  display: flex;
  border: 1px solid white;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: black;
  position: relative;
  cursor: pointer;
  ${({ isImageLoaded }) => applyFadeInAnimation(isImageLoaded, '0.5s')}
  @media (max-width: 768px) {
    width: 165px;
  }
`
const Image = styled.img<{ isImageLoaded: boolean }>`
  width: 100%;
  height: 297px;
  object-fit: cover;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  @media (max-width: 768px) {
    height: 237px;
  }
  ${({ isImageLoaded }) => applyFadeInAnimation(isImageLoaded, '0.5s')}
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
  @media (max-width: 768px) {
    font-size: 17px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 150px;
  @media (max-width: 768px) {
    min-width: 140px;
  }
`

const Left = styled.div`
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const InTheaterLogo = styled.div<{ isImageLoaded: boolean }>`
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
  ${({ isImageLoaded }) => applyFadeInAnimation(isImageLoaded, '0.5s')}
`

const VerticalLine = styled.div<{ isImageLoaded: boolean }>`
  position: relative;
  height: 60px;
  margin: 25px;
  ${({ isImageLoaded }) => applyFadeInAnimation(isImageLoaded, '0.5s')}

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #fff;
  }
`
