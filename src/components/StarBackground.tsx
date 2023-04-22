import styled, { keyframes } from 'styled-components'

const flicker = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`

const BlinkingStar = styled.div<{ top: number; left: number }>`
  position: absolute;
  height: 1px;
  width: 1px;
  background-color: white;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  border-radius: 100%;
  animation: ${flicker} 1s infinite alternate;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000;
`

const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const StarBackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const generateRandomStar = () => ({
  left: generateRandomNumber(0, window.innerWidth),
  top: generateRandomNumber(0, window.innerHeight)
})

const generateStars = (count: number) =>
  Array.from({ length: count }, () => generateRandomStar())

const stars = generateStars(150)

export function StarBackground() {
  return (
    <>
      <Background>
        <StarBackgroundWrapper>
          <StarsContainer>
            {stars.map((star, index) => (
              <BlinkingStar key={index} top={star.top} left={star.left} />
            ))}
          </StarsContainer>
        </StarBackgroundWrapper>
      </Background>
    </>
  )
}
