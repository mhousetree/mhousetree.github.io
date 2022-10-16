import * as React from 'react'
import { graphql, HeadFC, Link, PageProps } from 'gatsby'
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
  padding: 0 3rem;
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

  @media screen and (max-width: 940px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: flex-start;

    .gatsby-image-wrapper {
      grid-row: 1;
      grid-column: 1 / -1;
      width: min(60%, 300px);
      margin: 0 auto;
    }
  }
`

const HobbiesWrapper = styled.div`
  font-size: 0.9rem;
  ul {
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

    img {
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

const AboutPage: React.FC<PageProps<Queries.AboutQuery>> = ({ data }) => {
  const { hobby: hobbies, sns: snsInfos } = data.allGraphCmsProfile.nodes[0]

  const skills = data.allGraphCmsSkill.nodes

  const frontendSkills = skills.filter((skill) => skill.category === 'Frontend')
  const designSkills = skills.filter((skill) => skill.category === 'Design')
  const otherSkills = skills.filter((skill) => skill.category === 'Other')

  const certifications = data.allGraphCmsCertification.nodes

  const histories = data.allGraphCmsHistory.nodes.map((h) => new History(h))

  const renderSkills = (sourceSkills: GraphCmsSkill[]) => {
    return sourceSkills.map((skill) => {
      return (
        <li key={skill.title}>
          {skill.title} ({new Date(skill.from).getFullYear()} -)
          {skill.subSkills?.length !== 0 && (
            <ul>
              {skill.subSkills?.map((subSkill) => {
                return (
                  <li key={subSkill.title}>
                    {subSkill.title} ({new Date(subSkill.from).getFullYear()} -)
                  </li>
                )
              })}
            </ul>
          )}
        </li>
      )
    })
  }

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
                <HobbiesWrapper>
                  <h3>Hobbies</h3>
                  <ul>
                    {hobbies.map((hobby) => (
                      <li key={hobby}>{hobby}</li>
                    ))}
                  </ul>
                  <p>
                    趣味の様子は{' '}
                    <a
                      href={
                        snsInfos.find(
                          (snsInfo) => snsInfo.title === 'Instagram'
                        )?.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>{' '}
                    でご覧いただけます。
                  </p>
                </HobbiesWrapper>
              </ProfileWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="skills">Skills</h2>
              <SkillsWrapper>
                <div>
                  <h3>Frontend</h3>
                  <ul>{renderSkills(frontendSkills)}</ul>
                </div>
                <div>
                  <h3>Design</h3>
                  <ul>{renderSkills(designSkills)}</ul>
                </div>
                <div>
                  <h3>Other</h3>
                  <ul>
                    {certifications.map((certification) => (
                      <li key={certification.title}>
                        {certification.title} (
                        {new Date(certification.date).getFullYear()})
                      </li>
                    ))}
                    {renderSkills(otherSkills)}
                  </ul>
                </div>
              </SkillsWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="history">History</h2>
              <HistoryWrapper>
                {histories.map((history) => {
                  const renderSubHistory = history.subHistories?.length !==
                    0 && (
                    <ul>
                      {history.subHistories?.map((subHistory) => {
                        return (
                          <li key={subHistory.title}>
                            <h3>{subHistory.title}</h3>
                            <p>{subHistory.workingPeriod.toString()}</p>
                            {subHistory.detail.length !== 0 && (
                              <ul>
                                {subHistory.detail.map((detail) => (
                                  <li key={detail}>{detail}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )

                  return (
                    <li key={history.title}>
                      <h3>{history.title}</h3>
                      <p>{history.workingPeriod.toString()}</p>
                      {renderSubHistory}
                    </li>
                  )
                })}
              </HistoryWrapper>
            </Level2Section>
            <Level2Section>
              <h2 id="links">Links</h2>
              <LinksWrapper>
                {snsInfos.map((snsInfo) => (
                  <li key={snsInfo.title}>
                    <a
                      href={snsInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {snsInfo.icon && (
                        <img
                          src={snsInfo.icon.url}
                          alt={`${snsInfo.title} Icon`}
                        />
                      )}
                      {snsInfo.title}
                    </a>
                  </li>
                ))}
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

export const pageQuery = graphql`
  query About {
    allGraphCmsProfile {
      nodes {
        hobby
        sns {
          url
          title
          icon {
            url
          }
        }
      }
    }
    allGraphCmsSkill(filter: { isTopLevel: { eq: true } }) {
      nodes {
        title
        category
        level
        from
        subSkills {
          title
          category
          level
          from
        }
      }
    }
    allGraphCmsCertification(sort: { fields: date, order: ASC }) {
      nodes {
        title
        date
      }
    }
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
`

export const Head: HeadFC = () => (
  <Seo title="About" description="Informations about Mhousetree" />
)

type GraphCmsSubSkill = {
  title: string
  category: Queries.GraphCMS_SkillCategory
  level: number
  from: string
}

type GraphCmsSkill = {
  title: string
  category: Queries.GraphCMS_SkillCategory
  level: number
  from: string
  subSkills: readonly GraphCmsSubSkill[]
}

type GraphCmsHistory = {
  title: string
  detail: readonly string[]
  from: string
  to: string | null
  nowWorking: boolean
  subHistories?: readonly GraphCmsHistory[] | null
}

class History {
  // properties
  title: string
  detail: readonly string[]
  workingPeriod: WorkingPeriod
  subHistories?: History[]

  // constructor
  constructor(graphCmsHistory: GraphCmsHistory) {
    this.title = graphCmsHistory.title
    this.detail = graphCmsHistory.detail
    this.workingPeriod = new WorkingPeriod(
      graphCmsHistory.nowWorking,
      graphCmsHistory.from,
      graphCmsHistory.to
    )
    this.subHistories = graphCmsHistory.subHistories?.map((h) => new History(h))
  }
}

class WorkingPeriod {
  private from: string
  private to: string | null
  private nowWorking: boolean

  constructor(nowWorking: boolean, from: string, to: string | null) {
    this.nowWorking = nowWorking
    this.from = from
    this.to = to
  }

  toString(): string {
    if (this.to) {
      return `${getYearMonth(this.from)} - ${getYearMonth(this.to)}`
    } else if (this.nowWorking) {
      return `${getYearMonth(this.from)} - 現在`
    } else {
      return getYearMonth(this.from)
    }
  }
}
