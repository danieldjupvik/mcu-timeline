import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { scrollTo } from '../helpers/scrollTo'
import { MCUApiResponse } from '../hooks/useMCUApi'

import { Card } from './Card'

type ContentSectionProps = {
  data: MCUApiResponse[] | undefined
  isError: boolean
  activeTab: string
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  data,
  isError,
  activeTab
}) => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // const filterMovies = (movie: MCUApiResponse) => {
  //   const releaseDate = movie.release_date
  //   if (!releaseDate) return true
  //   const date = new Date(releaseDate)
  //   const thresholdDate = new Date()
  //   thresholdDate.setDate(thresholdDate.getDate() - 84)
  //   return date >= thresholdDate
  // }

  // const filterTVShows = (tvShow: MCUApiResponse) => {
  //   const lastAiredDate = tvShow.last_aired_date
  //   if (!lastAiredDate) return true
  //   const date = new Date(lastAiredDate)
  //   return date >= new Date()
  // }

  // const filteredData = data?.filter(
  //   activeTab === 'movies' ? filterMovies : filterTVShows
  // )

  const filteredData = data

  const scrollToInTheater = () => {
    const cardWrapper = document.getElementById('card-wrapper')

    const inTheaterCard = document.getElementById('active')
    const yOffset = -10

    if (inTheaterCard && cardWrapper) {
      const cardTopPosition =
        inTheaterCard.getBoundingClientRect().top -
        cardWrapper.getBoundingClientRect().top
      const targetPosition = cardTopPosition + yOffset

      scrollTo(cardWrapper, targetPosition, 2000)
    }
  }

  useEffect(() => {
    if (filteredData && !isImageLoaded) {
      scrollToInTheater()
    }
  }, [filteredData, isImageLoaded])

  if (isError) {
    return <ErrorMessage>{t('error_message')}</ErrorMessage>
  }

  return (
    <>
      <CardWrapper id="card-wrapper">
        {filteredData?.map((item, index, array) => (
          <div key={item.id}>
            <Card
              {...item}
              type={activeTab}
              index={index}
              array={array}
              isImageLoaded={isImageLoaded}
              setIsImageLoaded={setIsImageLoaded}
            />
          </div>
        ))}
        <Footer>
          <div>
            {t('dataProvidedBy')}{' '}
            <a href="https://github.com/AugustoMarcelo/mcuapi">
              AugustoMarcelo
            </a>
          </div>
          <div>{year} &copy; Daniel Djupvik Sætre</div>
        </Footer>
      </CardWrapper>
    </>
  )
}

const ErrorMessage = styled.div`
  margin-top: 20px;
`

const Footer = styled.div`
  padding: 40px;
  font-size: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: auto;
  height: calc(100vh - 325px);
  @media (max-width: 768px) {
    height: calc(100vh - 350px);
  }
  width: 100%;
  align-items: center;
`
