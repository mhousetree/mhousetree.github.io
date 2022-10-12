import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import { ColorCode } from '../constants/colors'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { isNight } from '../utils/night-mode'

const ResponsiveWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr min(960px, 80%) 1fr;
  align-items: center;
  background-color: ${ColorCode.MAIN_BG_COLOR};

  &[data-location-path='/about'],
  &[data-location-path='/about/'] {
    &[data-is-night='true'] {
      animation: about-bg-night 0.5s ease-in-out 0s 1 normal both;
    }
    animation: about-bg 0.5s ease-in-out 0s 1 normal both;
  }

  @keyframes about-bg {
    from {
      background-color: ${ColorCode.SUB_BG_COLOR};
    }
    to {
      background-color: ${ColorCode.SUB_BG_DARK_COLOR};
    }
  }

  @keyframes about-bg-night {
    from {
      background-color: ${ColorCode.SUB_BG_COLOR};
    }
    to {
      background-color: ${ColorCode.SUB_BG_NIGHT_COLOR};
    }
  }

  main {
    grid-column: 2;
  }
`

const TopPageLink = styled.div`
  position: fixed;
  z-index: 2;
  margin: 1rem 0 0 1rem;
  top: 0;

  a {
    display: flex;
    align-items: center;
    opacity: 0.5;
    text-decoration: none;
    font-family: 'Shelby', sans-serif;
    text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff;

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

const SubPageLink = styled.div`
  position: fixed;
  font-family: 'Shelby', sans-serif;
  font-size: calc(64px - (1200px - 100vw) * 0.05);

  @media screen and (min-width: 1200px) {
    font-size: 64px;
  }

  a {
    color: ${ColorCode.LIGHT_TEXT_COLOR};
    opacity: 0.3;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;

    &:hover {
      opacity: 0.7;
    }

    span,
    i {
      display: inline-block;
    }

    i {
      font-size: 0.9em;
    }

    span {
      line-height: 1;
    }
  }

  &[data-link-to='/works'] {
    right: 0;

    span {
      rotate: 90deg;
      translate: -0.2em;
    }
  }

  &[data-link-to='/about'] {
    left: 0;

    span {
      rotate: -90deg;
      translate: 0.1em;
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

  let sideLinkInfo

  switch (location.pathname) {
    case '/about':
    case '/about/':
      sideLinkInfo = { link: '/works', name: 'Works', iconDirection: 'right' }
      break
    case '/works':
    case '/works/':
      sideLinkInfo = { link: '/about', name: 'About', iconDirection: 'left' }
      break
    default:
      sideLinkInfo = { link: '/', name: 'Top' }
  }

  const subPageLink = location.pathname !== '/' && (
    <SubPageLink data-link-to={sideLinkInfo.link}>
      <Link to={sideLinkInfo.link}>
        <span>{sideLinkInfo.name}</span>
        <i className={`mic-arrow-${sideLinkInfo.iconDirection}`}></i>
      </Link>
    </SubPageLink>
  )

  return (
    <ResponsiveWrapper
      data-location-path={location.pathname}
      data-is-night={isNight()}
    >
      {topPageLink}
      {subPageLink}
      {children}
    </ResponsiveWrapper>
  )
}

type LayoutProps = {
  children: JSX.Element
}
