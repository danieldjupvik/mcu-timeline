import styled, { keyframes } from 'styled-components'

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const draw = keyframes`
  0%,
  100% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
`

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`

const Circle = styled.svg`
  animation: ${rotation} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
`

const CirclePath = styled.circle`
  stroke: #ed1d24;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${draw} 1.5s ease-in-out infinite;
  stroke-width: 6px;
  fill: none;
`

const Wrapper = styled.div`
  height: calc(100vh - 293px);
  display: flex;
  align-items: center;
`

export const Loader = () => {
  return (
    <Wrapper>
      <Spinner>
        <Circle viewBox="0 0 50 50">
          <CirclePath cx="25" cy="25" r="20" fill="none" />
        </Circle>
      </Spinner>
    </Wrapper>
  )
}
