import * as React from 'react'
import { HeadFC, Link } from 'gatsby'
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
  height: 100%;
  background-image: url(${window});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const MainTitle = styled.h1`
  width: 40%;
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
  width: 70%;
  height: calc(32vw);

  position: absolute;
  bottom: calc((100vh - 60vw) / 2);
  left: 50%;
  translate: -50% 0;

  font-family: 'Shelby', sans-serif;
  font-size: calc(72px - (1200px - 100vw) * 0.05);

  @media screen and (min-width: 1200px) {
    width: 384px;
    bottom: calc((100vh - 600px) / 2);
    font-size: 72px;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    height: 100%;

    @media screen and (min-width: 1200px) {
      gap: 180px;
    }

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

        a {
          left: 60%;
        }
      }

      &:last-child {
        width: 70%;
        margin-left: -30px;
        background-image: url(${grassWorks});
        transform-origin: left center;

        a {
          left: 40%;
        }
      }
    }

    li:has(a:hover) {
      animation: grass 0.3s ease-in-out 0.05s 1 normal both;

      @keyframes grass {
        0% {
          translate: 0;
          transform: scaleX(1);
        }
        25% {
          translate: -1px;
          transform: scaleX(0.999);
        }
        50% {
          transform: scaleX(1.001);
          translate: 1px;
        }
        100% {
          transform: scaleX(1);
          translate: 0;
        }
      }
    }

    a {
      position: absolute;
      padding: 3rem 5rem;
      top: 40%;
      transform: translate(-50%);
      display: block;
      text-decoration: none;
      color: #fff;
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
            translate: -2px;
          }
          50% {
            translate: 2px;
          }
          100% {
            translate: 0;
          }
        }
      }
    }
  }
`

const Branch01Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 30%;
  left: -10%;
  width: 50%;

  rotate: -15deg;
  translate: 0 -50%;

  filter: blur(2px);

  @media screen and (min-width: 1440px) {
    width: 720px;
    left: -145px;
  }
`

const IndexPage = () => {
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
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/works">Works</Link>
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
