import * as React from 'react'
import { HeadFC, Link } from 'gatsby'
import { rgba } from 'polished'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { Seo } from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout } from '../components/layout'
import styled from 'styled-components'

import { ColorCode } from '../constants/colors'
import { isNight } from '../utils/night-mode'

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
                <li>
                  <h3>滋賀県立守山高等学校 普通科</h3>
                  <p>2013.4 - 2016.3</p>
                </li>
                <li>
                  <h3>筑波大学 情報学群 情報メディア創成学類</h3>
                  <p>2016.4 - 2022.3</p>
                  <ul>
                    <li>
                      <h3>
                        サイエンスウェブ株式会社
                        マークアップエンジニア(アルバイト)
                      </h3>
                      <p>2019.7 - 2022.3</p>
                      <ul className="role">
                        <li>HTML/CSS/JavaScriptを用いた静的Webサイトの制作</li>
                        <li>CMS(WordPress, MODX)を用いたWebサイトの構築</li>
                        <li>
                          デザインデータ(psd形式)からのスライス等、デザインを基にしたWebサイト制作の技術を習得
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3>
                        株式会社ツクリエ
                        メールマガジン/イベントバナー制作(受付と兼任、アルバイト)
                      </h3>
                      <p>2020.9 - 2021.3</p>
                      <ul className="role">
                        <li>HTMLメールの作成</li>
                        <li>HTMLメール作成ツールの開発</li>
                        <li>施設内開催イベントのイベントバナー制作</li>
                      </ul>
                    </li>
                    <li>
                      <h3>
                        株式会社Penqe
                        フロントエンドエンジニア(長期インターンシップ)
                      </h3>
                      <p>2020.12 - 2021.3</p>
                      <ul className="role">
                        <li>
                          CMS(WordPress)を用いたWebサイトの制作(リニューアル作業)
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3>
                        株式会社ナビタイムジャパン
                        エンジニア体験インターンシップ
                      </h3>
                      <p>2021.2</p>
                    </li>
                    <li>
                      <h3>株式会社PR TIMES オンラインハッカソン</h3>
                      <p>2021.6</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <h3>楽天グループ株式会社 Application Engineer</h3>
                  <p>2022.4 - 現在</p>
                </li>
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
