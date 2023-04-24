import FontFaceObserver from 'fontfaceobserver'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ContentSection } from './components/ContentSection'
import { Loader } from './components/Loader'
import { StarBackground } from './components/StarBackground'
import { useMCUApi } from './hooks/useMCUApi'

function App() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('movies')
  const [bangersFontLoaded, setBangersFontLoaded] = useState(false)

  const { data, isLoading, isError } = useMCUApi(activeTab, {
    params: {
      order: 'release_date,ASC'
    }
  })

  useEffect(() => {
    const bangersObserver = new FontFaceObserver('Bangers')
    bangersObserver.load().then(() => setBangersFontLoaded(true))
  }, [])

  const handleTabClick = (tab: string) => setActiveTab(tab)

  return (
    <>
      <StarBackground />
      <Wrapper>
        <HeaderContainer
          visible={bangersFontLoaded}
          onClick={() => window.open('https://www.marvel.com/movies', '_blank')}
        >
          <Header>{t('header')}</Header>
        </HeaderContainer>
        <Description>{t('description')}</Description>
        <TabWrapper>
          {['movies', 'tvShows'].map((tab) => (
            <Tab
              key={tab}
              data-active={activeTab === tab}
              onClick={() => handleTabClick(tab)}
            >
              {t(tab)}
            </Tab>
          ))}
        </TabWrapper>
        {data && !isLoading ? (
          <ContentSection data={data} isError={isError} activeTab={activeTab} />
        ) : (
          <Loader />
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

const TabWrapper = styled.div`
  color: white;
  display: flex;
  gap: 14px;
  margin-bottom: 30px;
`

const Header = styled.div`
  font-family: 'Bangers', cursive;
  font-size: 48px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 4px;
`

const HeaderContainer = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 20px 30px;
  background-color: rgb(237, 29, 36);
  margin-top: 50px;
  margin-bottom: 40px;
  border-radius: 4px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  cursor: pointer;
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

const Description = styled.div`
  margin-bottom: 30px;
  line-height: 24px;
  font-size: 17px;
  @media (max-width: 768px) {
    max-width: 300px;
  }
`

export default App
