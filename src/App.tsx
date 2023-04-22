import { useMCUApi } from './hooks/useMCUApi'
import { ReactNode, useState, Fragment } from 'react'
import { StarBackground } from './components/StarBackground'
import styled from 'styled-components'
import { Card } from './components/Card'
import { Loader } from './components/Loader'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('movies')
  const { data, isLoading, isError } = useMCUApi(activeTab, {
    params: {
      order: 'release_date,ASC'
    }
  })

  const date = new Date()
  const year = date.getFullYear()

  type TabContent = {
    content: ReactNode
  }

  type Tabs = {
    [key: string]: TabContent
  }

  const tabs: Tabs = {
    movies: {
      content: (
        <CardWrapper>
          {data
            ?.filter((movie) => {
              const releaseDate = new Date(movie.release_date)
              const twelveWeeksAgo = new Date()
              twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84) // 12 weeks ago
              return releaseDate >= twelveWeeksAgo
            })
            .map((movie, index, array) => (
              <Fragment key={movie.id}>
                <Card {...movie} type={activeTab} />
                {index !== array.length - 1 && <VerticalLine />}
              </Fragment>
            ))}
        </CardWrapper>
      )
    },
    tvShows: {
      content: (
        <CardWrapper>
          {data?.map((tvShow, index, array) => {
            const lastAiredDate =
              tvShow.last_aired_date && new Date(tvShow.last_aired_date)
            if (lastAiredDate && lastAiredDate < new Date()) {
              return null
            }
            return (
              <Fragment key={tvShow.id}>
                <Card {...tvShow} type={activeTab} />
                {index !== array.length - 1 && <VerticalLine />}
              </Fragment>
            )
          })}
        </CardWrapper>
      )
    }
  }

  return (
    <>
      <StarBackground />
      <Wrapper>
        <HeaderContainer>
          <Header>{t('header')}</Header>
        </HeaderContainer>
        <Description>{t('description')}</Description>
        <TabWrapper>
          <Tab
            data-active={activeTab === 'movies'}
            onClick={() => setActiveTab('movies')}
          >
            {t('movies')}
          </Tab>
          <Tab
            data-active={activeTab === 'tvShows'}
            onClick={() => setActiveTab('tvShows')}
          >
            {t('tvShows')}
          </Tab>
        </TabWrapper>
        {isError ? (
          <ErrorMessage>{t('error_message')}</ErrorMessage>
        ) : (
          <>
            {data && !isLoading ? (
              <>
                {tabs[activeTab].content}
                <Footer>
                  <div>
                    {t('dataProvidedBy')}{' '}
                    <a href="https://github.com/AugustoMarcelo/mcuapi">
                      AugustoMarcelo
                    </a>{' '}
                  </div>
                  <div>{year} &copy; Daniel Djupvik Sætre</div>
                </Footer>
              </>
            ) : (
              <Loader />
            )}
          </>
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Header = styled.div`
  font-family: 'Bangers', cursive;
  font-size: 48px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 4px;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 20px 30px;
  background-color: rgb(237, 29, 36);
  margin-top: 50px;
  margin-bottom: 40px;
  border-radius: 4px;
`
const TabWrapper = styled.div`
  color: white;
  display: flex;
  gap: 14px;
  margin-bottom: 30px;
`

const Tab = styled.div`
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 5px;
  &[data-active='true'] {
    border-bottom: 3px solid #ed1d24;
  }
  :hover {
    border-bottom: 3px solid #ed1d24;
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 4px;
`

const Footer = styled.div`
  padding: 40px;
  font-size: 13px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const Description = styled.div`
  margin-bottom: 30px;
  padding: 0 20px;
  font-size: 17px;
`

const VerticalLine = styled.div`
  position: relative;
  height: 60px;
  margin-left: 35px;
  margin-right: 35px;
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

const ErrorMessage = styled.div`
  margin-top: 20px;
`

export default App
