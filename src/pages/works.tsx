import * as React from 'react'
import { HeadFC, Link } from 'gatsby'
import { rgba } from 'polished'

import { Seo } from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout } from '../components/layout'
import styled from 'styled-components'

import { ColorCode } from '../constants/colors'

const GridMain = styled.main`
  height: 100%;
  display: grid;
  padding-top: 84px;
  grid-template-rows: max-content 1fr;
  animation: main-appear 0.5s ease-in-out 0.5s 1 normal both;

  @keyframes main-appear {
    from {
      clip-path: inset(0 -20px 100% -20px);
    }

    to {
      clip-path: inset(0 -20px 0 -20px);
    }
  }
`

const Navigation = styled.nav`
  position: fixed;
  z-index: 2;
  top: 0;
  overflow: hidden;
  width: min(960px, 80%);
  border-radius: 0 0 2px 2px;
  padding: 1rem 0;
  animation: slide-appear 1s ease-out 0s 1 normal both;
  backdrop-filter: blur(5px);
  mask-image: linear-gradient(to bottom, #000 90%, transparent 100%);
  background-color: ${rgba(ColorCode.SUB_BG_COLOR, 0.5)};

  @keyframes slide-appear {
    from {
      translate: 0 -84px;
    }
    to {
      translate: 0;
    }
  }

  input[type='checkbox'] {
    z-index: 2;
    position: absolute;
    right: 0;
  }

  input:checked + ul {
    max-height: 20vh;
    mask-image: linear-gradient(to bottom, #000 0%, #000 100%);
  }

  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 2px 1rem 2px 0;
    gap: 0.5rem;
    list-style: none;
    align-items: flex-end;
    max-height: 52px;
    mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
    transition: 0.3s;

    a {
      display: block;
      color: ${ColorCode.MAIN_TEXT_COLOR};
      padding: 0 0.8rem;
      border: 1px solid ${rgba(ColorCode.LIGHT_TEXT_COLOR, 0.2)};
      background-color: ${rgba(ColorCode.SUB_BG_COLOR, 0.8)};
      border-radius: 4px;
      text-decoration: none;
      transition: 0.2s;

      &:hover {
        background-color: ${ColorCode.SUB_BG_COLOR};
        translate: 0 -2px;
        box-shadow: 0 2px 12px ${rgba(ColorCode.LIGHT_TEXT_COLOR, 0.1)};
      }
    }
  }
`

const MainContent = styled.div`
  position: relative;
  margin: 3rem 0;
  padding: 0.5rem;

  h1 {
    text-align: center;
    position: absolute;
    top: 0;
    left: 2rem;
    font-family: 'Shelby', sans-serif;
    font-size: 128px;
    opacity: 0.1;
  }

  h3 {
    font-size: 24px;
  }
`

const WorksWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  > a {
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 3rem;

    color: ${ColorCode.MAIN_TEXT_COLOR};
    text-decoration: none;

    transition: 0.3s;

    h2 {
      text-align: left;
    }

    &:nth-child(2n + 1) {
      flex-direction: row-reverse;
      section * {
        text-align: right;
      }

      p {
        margin-right: 0;
        margin-left: auto;
      }

      &:hover {
        a {
          margin: 1rem 0 0 auto;
        }
      }
      a {
        margin: 0 0 0 auto;
        clip-path: inset(0 0 0 100%);
      }
    }

    p {
      max-width: 80%;
    }

    > :first-child {
      width: 40%;
      aspect-ratio: 1;
      border: 1.2vw solid ${ColorCode.MAIN_TEXT_COLOR};
      box-shadow: 4px 4px 12px ${rgba(ColorCode.MAIN_TEXT_COLOR, 0.2)};

      @media screen and (min-width: 1200px) {
        border-width: 14.4px;
      }
    }

    a {
      display: block;
      margin: 0 auto 0 0;
      padding: 0.5rem 1.1rem 0 1rem;
      height: 0;
      width: fit-content;
      border: 1px solid ${ColorCode.ACCENT_COLOR};

      font-family: 'Shelby', sans-serif;
      text-decoration: none;
      font-size: 2rem;
      line-height: 1;

      clip-path: inset(0 100% 0 0);
      transition: 0.3s;
    }

    &:hover {
      translate: 0 -4px;
      color: ${ColorCode.ACCENT_COLOR};

      a {
        clip-path: inset(0 0 0 0);
        height: 42px;
        margin: 1rem auto 0 0;

        &:hover {
          background-color: ${ColorCode.ACCENT_COLOR};
          color: #fff;
        }
      }
    }
  }
`

const tags = [
  { name: 'JavaScript' },
  { name: 'Gatsby' },
  { name: 'Vue.js' },
  { name: 'Frontend' },
  { name: 'Design' },
  { name: 'CSS animation' },
  { name: 'React' },
  { name: 'FastAPI' },
  { name: 'HTML + CSS' },
  { name: 'Python' },
  { name: 'Figma' },
]

const AboutPage = () => {
  return (
    <Layout>
      <GridMain>
        <Navigation>
          <input type="checkbox" name="tags-show" id="tags" />
          <ul>
            {tags.map((tag) => (
              <li>
                <Link to="/">{tag.name}</Link>
              </li>
            ))}
          </ul>
        </Navigation>
        <MainContent>
          <h1>Works</h1>
          <WorksWrapper>
            <Link to="/">
              <StaticImage src="../images/profile.jpg" alt="image" />
              <section>
                <h2>Kaiwa</h2>
                <p>JavaScript / Vue.js / FastAPI / Python</p>
                <p>Web Application</p>
                <p>
                  卒業研究で制作した、音声読み上げ機能を有する外国語会話集アプリケーション。
                </p>
                <Link to="/">Detail</Link>
              </section>
            </Link>
            <Link to="/">
              <StaticImage src="../images/profile.jpg" alt="image" />
              <section>
                <h2>Kaiwa</h2>
                <p>JavaScript / Vue.js / FastAPI / Python</p>
                <p>Web Application</p>
                <p>
                  卒業研究で制作した、音声読み上げ機能を有する外国語会話集アプリケーション。
                </p>
                <Link to="/">Detail</Link>
              </section>
            </Link>
            <Link to="/">
              <StaticImage src="../images/profile.jpg" alt="image" />
              <section>
                <h2>Kaiwa</h2>
                <p>JavaScript / Vue.js / FastAPI / Python</p>
                <p>Web Application</p>
                <p>
                  卒業研究で制作した、音声読み上げ機能を有する外国語会話集アプリケーション。
                </p>
                <Link to="/">Detail</Link>
              </section>
            </Link>
          </WorksWrapper>
        </MainContent>
      </GridMain>
    </Layout>
  )
}

export default AboutPage

export const Head: HeadFC = () => (
  <Seo title="About" description="Informations about Mhousetree" />
)
