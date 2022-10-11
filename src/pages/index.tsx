import * as React from 'react'
import { HeadFC, Link } from 'gatsby'
import Lottie from 'lottie-react'

import { Seo } from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout } from '../components/layout'
import styled from 'styled-components'

import image from '../images/window.png'
import logoAnimation from '../animations/logoAnimation.json'

const GridMain = styled.main`
  height: 100%;
  display: grid;
  justify-items: center;
  grid-template-rows: 3fr 2fr;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const MainTitle = styled.h1`
  margin-top: -50px;
  width: 50%;
  align-self: flex-end;
`

const Navigation = styled.nav`
  font-family: 'Shelby', sans-serif;
  width: 45%;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: #fff;
      font-size: 64px;
    }
  }
`

const Branch01Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 40%;
  left: -10%;
  width: 50%;

  rotate: -30deg;
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
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Works</Link>
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
