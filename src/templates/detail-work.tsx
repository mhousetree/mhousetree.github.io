import { HeadFC, HeadProps, Link } from 'gatsby'
import Markdown from 'markdown-to-jsx'
import { rgba } from 'polished'
import * as React from 'react'

import styled from 'styled-components'
import { WorkPageContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { ColorCode } from '../constants/colors'
import { getYearMonthDate } from '../utils/get-date'
import { Seo } from '../components/seo'

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

const Header = styled.header`
  position: fixed;
  z-index: 2;
  top: 0;
  overflow: hidden;
  width: min(960px, 80%);
  border-radius: 0 0 2px 2px;
  padding: 1rem 0;
  /* TODO: なぜ動く？ */
  animation: slide-appear 1s ease-out 0s 1 normal both;
  backdrop-filter: blur(15px);
  mask-image: linear-gradient(to bottom, #000 90%, transparent 100%);
  background-color: ${rgba(ColorCode.SUB_BG_COLOR, 0.5)};
  text-align: center;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
  }

  a {
    display: block;
    position: absolute;
    left: 0;
    top: 55%;
    translate: 0 -50%;

    color: ${ColorCode.MAIN_TEXT_COLOR};
    text-decoration: none;
    font-size: 1.5rem;

    &:hover {
      animation: move-left 1s ease-out 0s infinite normal both;
      @keyframes move-left {
        0% {
          padding-left: 10px;
        }
        90% {
          padding-left: 0px;
        }
        100% {
          padding-left: 10px;
        }
      }
    }
  }
`

const MainContent = styled.article`
  margin: 3rem 0;
  padding: 0.5rem;
`

const TopInfoWrapper = styled.section`
  display: grid;
  grid-template-columns: 40% 1fr;
  align-items: center;
  gap: 48px;
  margin-bottom: 5rem;

  img {
    width: 100%;
    box-shadow: 4px 4px 12px ${rgba(ColorCode.MAIN_TEXT_COLOR, 0.2)};
  }

  > section {
    > p {
      margin-bottom: 1rem;
    }
    > div {
      margin-bottom: 24px;
    }
  }

  p {
    line-height: 1.5;
  }
`

const LinksWrapper = styled.div`
  display: flex;

  a {
    display: block;
    position: relative;
    font-size: 3rem;
    line-height: 1;
    text-decoration: none;
    color: ${ColorCode.MAIN_TEXT_COLOR};
    transition: 0.15s;

    &[data-link-type='url']::before {
      content: '作品を見る';
      position: absolute;
      font-size: 0.7rem;
      letter-spacing: -0.05rem;
      line-height: 1;
      width: max-content;
      left: 50%;
      bottom: 0rem;
      translate: -50%;
      height: 0px;
      overflow: hidden;
      clip-path: inset(0 0 100%);
      transition: 0.2s;
    }

    &:hover {
      color: ${ColorCode.ACCENT_COLOR};

      &[data-link-type='url']::before {
        height: 0.7rem;
        bottom: -0.7rem;
        clip-path: inset(0);
      }
    }
  }
`

const Metadata = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 0.9rem;

  h2 {
    font-size: 24px;
    font-weight: normal;
  }
`

const DescriptionWrapper = styled.section`
  h2 {
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  section {
    display: flex;
    gap: 2rem;

    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }

    &:has(img):nth-of-type(2n) {
      flex-direction: row-reverse;
    }

    img {
      width: 40%;
      aspect-ratio: 1;
      object-fit: cover;
    }
  }

  p:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`

const DetailWorkTemplate: React.FC<Props> = ({ pageContext }) => {
  const { workInfo } = pageContext

  return (
    <Layout>
      <GridMain>
        <Header>
          <Link to="/works">
            <i className="mic-arrow-left"></i>
          </Link>
          <h1>{workInfo.title}</h1>
        </Header>
        <MainContent>
          <TopInfoWrapper>
            <img src={workInfo.thumbnail.url} alt={workInfo.title} />
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: workInfo.shortDescription.replace(/\n/g, '<br>'),
                }}
              />
              <Metadata>
                <section>
                  <h2>Period</h2>
                  <p>
                    {getYearMonthDate(workInfo.from)} -{' '}
                    {getYearMonthDate(workInfo.to)}
                  </p>
                </section>
                <section>
                  <h2>Skills</h2>
                  <p>
                    {workInfo.tags[0].name}
                    {workInfo.tags.slice(1).map((tag) => (
                      <> / {tag.name}</>
                    ))}
                  </p>
                </section>
              </Metadata>
              {workInfo.url && (
                <LinksWrapper>
                  <a
                    href={workInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-link-type="url"
                  >
                    <i className="mic-play-browser"></i>
                  </a>
                </LinksWrapper>
              )}
            </section>
          </TopInfoWrapper>
          <DescriptionWrapper>
            <h2>Description</h2>
            {workInfo.description.length !== 0 ? (
              workInfo.description.map((description) => (
                <section>
                  <Markdown options={{ wrapper: 'div', forceWrapper: true }}>
                    {description.text}
                  </Markdown>
                  {description.image && (
                    <img
                      src={description.image.url}
                      alt={`${workInfo.title}の画像です。`}
                    />
                  )}
                </section>
              ))
            ) : (
              <p>説明文は準備中です。</p>
            )}
          </DescriptionWrapper>
        </MainContent>
      </GridMain>
    </Layout>
  )
}

export default DetailWorkTemplate

export const Head: HeadFC = (props: HeadProps) => {
  const headProps = props as Props

  return (
    <Seo
      title={headProps.pageContext.workInfo.title}
      description={`Informations about ${headProps.pageContext.workInfo.title}`}
    />
  )
}

type Props = {
  pageContext: WorkPageContext
}
