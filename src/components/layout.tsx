import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import { ColorCode } from '../constants/colors'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const ResponsiveWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr min(960px, 80%) 1fr;
  align-items: center;
  background-color: ${ColorCode.MAIN_BG_COLOR};

  &[data-location-path='/about'] {
    animation: about-bg 1s linear 1s 1 normal both;
  }

  @keyframes about-bg {
    from {
      background-color: ${ColorCode.SUB_BG_COLOR};
    }
    to {
      background-color: ${ColorCode.SUB_BG_DARK_COLOR};
    }
  }

  main {
    grid-column: 2;
  }
`

const TopPageLink = styled.div`
  position: fixed;
  margin: 1rem 0 0 1rem;
  top: 0;

  a {
    display: flex;
    align-items: center;
    opacity: 0.5;
    text-decoration: none;
    font-family: 'Shelby', sans-serif;

    #text-wrapper {
      overflow: hidden;
      p {
        color: ${ColorCode.LIGHT_TEXT_COLOR};
        font-size: 2rem;
        line-height: 1;
        padding: 0.5rem;
        transition: 0.3s;
        translate: -100%;
      }
    }

    &:hover {
      opacity: 1;

      #text-wrapper {
        p {
          translate: 0;
        }
      }
    }
  }

  img {
    width: 48px;
    height: 48px;
    transition: opacity 0.3s;

    &:hover {
      animation: rotate 1s ease-in-out 0s infinite alternate both;
      @keyframes rotate {
        from {
          rotate: 0deg;
        }
        to {
          rotate: 6deg;
        }
      }
    }
  }
`

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  const topPageLink = location.pathname !== '/' && (
    <TopPageLink>
      <Link to="/">
        <StaticImage
          placeholder="none"
          src="../images/icon.svg"
          alt="Go to Toppage"
        />
        <div id="text-wrapper">
          <p>Go to Top</p>
        </div>
      </Link>
    </TopPageLink>
  )

  return (
    <ResponsiveWrapper data-location-path={location.pathname}>
      {topPageLink}
      {children}
    </ResponsiveWrapper>
  )
}

type LayoutProps = {
  children: JSX.Element
}
