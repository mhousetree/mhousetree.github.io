import * as React from 'react'
import { HeadFC, Link, navigate } from 'gatsby'
import Lottie from 'lottie-react'

import { Seo } from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout } from '../components/layout'
import styled from 'styled-components'

import window from '../images/window.png'
import grassAbout from '../images/grass_about.png'
import grassWorks from '../images/grass_works.png'
import logoAnimation from '../animations/logoAnimation.json'
import { ColorCode } from '../constants/colors'

const GridMain = styled.main`
  position: relative;
  height: 100vh;
  background-image: url(${window});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  &.transition {
    animation: transition-main 1s cubic-bezier(0.5, 0, 1, 1) 0s 1 normal both;

    h1 {
      animation: transition-h1 1s cubic-bezier(0.5, 0, 0.5, 1) 0s 1 normal both;
    }
  }

  @keyframes transition-main {
    from {
      scale: 1;
      translate: 0;
    }
    to {
      scale: 4.5;
      translate: 0 200px;
    }
  }
  @keyframes transition-h1 {
    0% {
      transform: scale(1);
      opacity: 1;
      filter: none;
    }
    50% {
      filter: brightness(4) saturate(1.5) hue-rotate(-10deg) blur(5px);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
      filter: brightness(4) saturate(1.5) hue-rotate(-10deg) blur(30px);
    }
  }
`

const MainTitle = styled.h1`
  width: 40vw;
  position: absolute;
  top: calc(50% - 2.5vw);
  left: 50%;
  translate: -50% -50%;

  @media screen and (min-width: 1200px) {
    width: 480px;
    top: 47%;
  }
`

const Navigation = styled.nav`
  width: 70vw;
  height: 32vw;

  position: absolute;
  bottom: calc((100vh - 60vw) / 2);
  left: 50%;
  translate: -50% 0;

  @media screen and (min-width: 1200px) {
    width: 840px;
    height: 384px;
    bottom: calc((100vh - 720px) / 2);
    font-size: 72px;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    height: 100%;

    li {
      position: relative;
      background-size: contain;
      background-repeat: no-repeat;
      width: 65%;
      height: 100%;

      &:first-child {
        background-image: url(${grassAbout});
        margin-left: 10px;
        z-index: 2;
        transform-origin: right center;

        @media screen and (min-width: 1200px) {
        }

        button {
          left: 60%;
        }
      }

      &:last-child {
        width: 70%;
        margin-left: -30px;
        background-image: url(${grassWorks});
        transform-origin: left center;

        button {
          left: 40%;
        }
      }
    }

    li:has(button:hover) {
      animation: grass 0.3s ease-in-out 0.05s 1 normal both;

      @keyframes grass {
        0% {
          translate: 0;
        }
        25% {
          translate: -1px;
        }
        75% {
          translate: 1px;
        }
        100% {
          translate: 0;
        }
      }
    }
  }
`

const Branch01Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 30vh;
  left: -22vw;
  width: 50vw;

  rotate: -15deg;
  translate: 0 -50%;

  filter: blur(2px);

  @media screen and (min-width: 1200px) {
    left: calc((50vw - 480px) * -1 - 12vw);
  }

  @media screen and (min-width: 1440px) {
    width: 720px;
    left: calc((50vw - 480px) * -1 - 144px);
  }
`

const LinkButton = styled.button`
  cursor: pointer;
  position: absolute;
  padding: 10% 20%;
  top: 35%;
  transform: translate(-50%);
  display: block;
  font-family: 'Shelby', sans-serif;
  font-size: calc(72px - (1200px - 100vw) * 0.05);
  text-decoration: none;
  color: #fff;
  border: none;
  background-color: transparent;
  text-shadow: 0 0 20px ${ColorCode.LIGHT_TEXT_COLOR},
    0 0 10px ${ColorCode.LIGHT_TEXT_COLOR},
    0 0 2px ${ColorCode.LIGHT_TEXT_COLOR};
  transition: 0.3s;

  &:hover {
    animation: text 0.3s ease-in-out 0s 1 normal both;
    @keyframes text {
      0% {
        translate: 0;
      }
      25% {
        translate: -3px;
      }
      75% {
        translate: 3px;
      }
      100% {
        translate: 0;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    font-size: 72px;
  }
`

const IndexPage = () => {
  const pageTransition = (to: string) => {
    const target = document.getElementsByTagName('main')[0]

    target.classList.add('transition')

    setTimeout(() => navigate(to), 1000)
  }

  return (
    <Layout>
      <GridMain>
        <MainTitle>
          <Lottie
            animationData={logoAnimation}
            loop={false}
            alt="Mhousetree's Portfolio"
          />
        </MainTitle>
        <Navigation>
          <ul>
            <li>
              <LinkButton onClick={() => pageTransition('/about')}>
                About
              </LinkButton>
            </li>
            <li>
              <LinkButton onClick={() => pageTransition('/works')}>
                Works
              </LinkButton>
            </li>
          </ul>
        </Navigation>
        <Branch01Wrapper>
          <StaticImage
            placeholder="none"
            src="../images/branch-01.png"
            alt="Illust of branch"
          />
        </Branch01Wrapper>
      </GridMain>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <Seo />
