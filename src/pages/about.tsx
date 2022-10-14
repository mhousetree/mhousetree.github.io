import * as React from 'react'
import { graphql, HeadFC, Link, useStaticQuery } from 'gatsby'
import { rgba } from 'polished'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { Seo } from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout } from '../components/layout'
import styled from 'styled-components'

import { ColorCode } from '../constants/colors'
import { isNight } from '../utils/night-mode'
import { getYearMonth } from '../utils/get-year-month'

const GridMain = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: max-content calc(100vh - 120px);
`

const Navigation = styled.nav`
  width: 100%;
  height: 120px;
  background-color: ${ColorCode.LIGHT_TEXT_COLOR};
  box-shadow: 0 12px 32px ${ColorCode.LIGHT_TEXT_COLOR};
  border-radius: 0 0 2px 2px;
  padding: 0 1rem 1rem;
  animation: slide-appear 0.5s ease-in-out 0s 1 normal both;

  @keyframes slide-appear {
    from {
      translate: 0 -152px;
    }
    to {
      translate: 0;
    }
  }

  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    height: 100%;
    align-items: flex-end;
    background-color: ${ColorCode.MAIN_TEXT_COLOR};

    a {
      font-family: 'Shelby', sans-serif;
      font-size: calc(64px - (1200px - 100vw) * 0.05);
      color: white;
      text-decoration: none;

      @media screen and (min-width: 1200px) {
        font-size: 64px;
      }
    }
  }
`

const MainContent = styled.div`
  margin: 48px 0;
  padding: 0.5rem;
  color: ${ColorCode.LIGHT_TEXT_COLOR};
  background-color: ${rgba(ColorCode.MAIN_BG_COLOR, 0.7)};
  box-shadow: 0 0 32px ${ColorCode.MAIN_BG_COLOR};
  animation: switch-on-1 0.3s ease-in-out 0.5s 1 normal both,
    switch-on-2 0.3s ease-in-out 0.7s 1 normal both;

  &[data-is-night='true'] {
    background-color: ${rgba(ColorCode.MAIN_BG_COLOR, 0.9)};
  }

  @keyframes switch-on-1 {
    from {
      height: 0%;
    }
    to {
      height: calc(100% - 96px);
    }
  }
  @keyframes switch-on-2 {
    from {
      border-radius: 100px;
      padding: 0;
      filter: blur(30px);
    }
    to {
      border-radius: 2px;
      padding: 0.5rem;
      filter: blur(0);
    }
  }

  h1,
  h2 {
    text-align: center;
  }

  h1 {
    position: absolute;
    top: 0;
    left: 2rem;
    font-family: 'Shelby', sans-serif;
    font-size: 128px;
    opacity: 0.1;
  }

  h2 {
    font-size: 36px;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 24px;
  }
`

const Level2Section = styled.section`
  margin: 3rem 0;
`

const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: center;

  div:first-child {
    text-align: right;
  }

  ul {
    padding-left: 1.5rem;
  }

  p {
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
`

const SkillsWrapper = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  row-gap: 2rem;
  font-size: 0.9rem;

  div {
    width: fit-content;
  }

  h3 {
    width: fit-content;
  }

  ul {
    padding-left: 1.5rem;
    width: fit-content;
    margin: 0;

    li {
      width: fit-content;
    }
  }
`

const HistoryWrapper = styled.ul`
  width: fit-content;
  margin: 0 auto;
  padding-left: 1.5rem;

  h3 {
    font-size: 1rem;
  }

  p,
  ul {
    font-size: 0.8rem;
  }

  .role {
    color: ${rgba(ColorCode.MAIN_TEXT_COLOR, 0.6)};
  }

  > li > p {
  }

  ul {
    padding-left: 1.5rem;
  }
`

const LinksWrapper = styled.ul`
  display: flex;
  width: fit-content;
  list-style: none;
  gap: 1rem;
  margin: 0 auto;

  li {
    width: 100px;
    text-align: center;

    .gatsby-image-wrapper {
      margin-bottom: 0.5rem;
      background-color: #fff;
      border-radius: 50%;
    }
  }

  a {
    display: block;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      translate: 0 -2px;
    }
  }
`

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allGraphCmsHistory(
        sort: { fields: from, order: ASC }
        filter: { isTopLevel: { eq: true } }
      ) {
        nodes {
          title
          detail
          from
          to
          nowWorking
          subHistories {
            title
            detail
            from
            to
            nowWorking
          }
        }
      }
    }
  `)

  const histories = data.allGraphCmsHistory.nodes

  return (
    <Layout>
      <GridMain>
        <Navigation>
          <ul>
            <li>
              <Link to="#profile">Profile</Link>
            </li>
            <li>
              <Link to="#skills">Skills</Link>
            </li>
            <li>
              <Link to="#history">History</Link>
            </li>
            <li>
              <Link to="#links">Links</Link>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
          </ul>
        </Navigation>
        <MainContent data-is-night={isNight()}>
          <h1>About</h1>
          <SimpleBar style={{ height: '100%' }} autoHide={true}>
            <Level2Section>
              <h2 id="profile">Profile</h2>
              <ProfileWrapper>
                <div>
                  <h3>Mhousetree</h3>
                  <p>
                    Frontend Engineer
                    <br />
                    フロントエンドエンジニア
                  </p>
                  <p>
                    From Kyoto
                    <br />
                    京都出身
                  </p>
                </div>
                <StaticImage
                  src="../images/profile.jpg"
                  alt="Photo of Mhousetree"
                />
                <div>
                  <h3>Hobbies</h3>
                  <ul>
                    <li>hoge</li>
                    <li>fuga</li>
                    <li>piyo</li>
                  </ul>
                </div>
              </ProfileWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="skills">Skills</h2>
              <SkillsWrapper>
                <div>
                  <h3>Frontend</h3>
                  <ul>
                    <li>HTML(2016 -)</li>
                    <li>
                      CSS(2016 -)
                      <ul>
                        <li>SCSS(2020 -)</li>
                        <li>CSS animation(2021 -)</li>
                      </ul>
                    </li>
                    <li>JavaScript(2021 -)</li>
                    <li>TypeScript(2022 -)</li>
                    <li>Vue.js(2021 -)</li>
                    <li>
                      React(2021 -)
                      <ul>
                        <li>Gatsby(2021 -)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Design</h3>
                  <ul>
                    <li>Adobe Illustrator(2016 -)</li>
                    <li>Adobe Photoshop(2016 -)</li>
                    <li>Adobe Premire Pro(2022 -)</li>
                    <li>Figma(2022 -)</li>
                  </ul>
                </div>
                <div>
                  <h3>Other</h3>
                  <ul>
                    <li>TOEIC(IPテスト) 900点(2021)</li>
                    <li>実用英語技能検定 準一級(2021)</li>
                    <li>基本情報技術者試験(2021)</li>
                    <li>
                      Python(2020 -)
                      <ul>
                        <li>FastAPI(2021 -)</li>
                        <li>Django(2020 -)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </SkillsWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="history">History</h2>
              <HistoryWrapper>
                {histories.map((history: History) => {
                  const getWorkingPeriod = (
                    from: string,
                    nowWorking: boolean,
                    to?: string
                  ) => {
                    let workingPeriod

                    if (to) {
                      workingPeriod = `${getYearMonth(from)} - ${getYearMonth(
                        to
                      )}`
                    } else if (nowWorking) {
                      workingPeriod = `${getYearMonth(from)} - 現在`
                    } else {
                      workingPeriod = getYearMonth(from)
                    }

                    return workingPeriod
                  }

                  const renderSubHistory = history.subHistories?.length !==
                    0 && (
                    <ul>
                      {history.subHistories?.map((subHistory) => {
                        return (
                          <li>
                            <h3>{subHistory.title}</h3>
                            <p>
                              {getWorkingPeriod(
                                subHistory.from,
                                subHistory.nowWorking,
                                subHistory.to
                              )}
                            </p>
                            {subHistory.detail.length !== 0 && (
                              <ul>
                                {subHistory.detail.map((detail) => (
                                  <li>{detail}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )

                  return (
                    <li>
                      <h3>{history.title}</h3>
                      <p>
                        {getWorkingPeriod(
                          history.from,
                          history.nowWorking,
                          history.to
                        )}
                      </p>
                      {renderSubHistory}
                    </li>
                  )
                })}
              </HistoryWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="links">Links</h2>
              <LinksWrapper>
                <li>
                  <a
                    href="https://twitter.com/mhousetree"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StaticImage
                      placeholder="none"
                      src="../images/twitter.svg"
                      alt="Twitter icon"
                    />
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://qiita.com/mhousetree"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StaticImage
                      placeholder="none"
                      src="../images/qiita.svg"
                      alt="Qiita icon"
                    />
                    Qiita
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/mhousetree"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StaticImage
                      placeholder="none"
                      src="../images/github.svg"
                      alt="GitHub icon"
                    />
                    GitHub
                  </a>
                </li>
              </LinksWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="contact">Contact</h2>
              <p style={{ textAlign: 'center' }}>
                <a href="mailto:mhousetree@gmail.com">mhousetree@gmail.com</a>
              </p>
            </Level2Section>
          </SimpleBar>
        </MainContent>
      </GridMain>
    </Layout>
  )
}

export default AboutPage

export const Head: HeadFC = () => (
  <Seo title="About" description="Informations about Mhousetree" />
)

type History = {
  title: string
  detail: string[]
  from: string
  to?: string
  nowWorking: boolean
  subHistories?: History[]
}
