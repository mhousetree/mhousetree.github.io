import * as React from 'react'
import { graphql, HeadFC, Link, PageProps } from 'gatsby'
import { rgba } from 'polished'

import { Seo } from '../components/seo'
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

  div:has(:checked) + ul {
    max-height: 40vh;
    mask-image: linear-gradient(to bottom, #000 0%, #000 100%);
  }

  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 2px 2rem 2px 0;
    gap: 0.5rem;
    list-style: none;
    align-items: flex-end;
    max-height: 52px;
    mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
    transition: 0.3s;

    span {
      font-size: 0.8rem;
      color: ${rgba(ColorCode.MAIN_TEXT_COLOR, 0.6)};
    }

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

const TagsToggleButton = styled.div`
  z-index: 2;
  position: absolute;
  top: 1.3rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  transition: 0.15s;

  &:hover {
    color: ${ColorCode.ACCENT_COLOR};
  }

  input[type='checkbox'] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    text-indent: -100%;
    white-space: nowrap;
    overflow: hidden;

    &::before {
      font-family: 'mhousetree-icons';
      speak: never;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;

      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      content: '\\e905';

      display: block;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 2rem;
      text-indent: 0;
    }
  }

  input:checked + label {
    &::before {
      content: '\\e906';
    }
  }
`

const MainContent = styled.div`
  position: relative;
  margin: 3rem 0;
  padding: 0.5rem;

  h1 {
    position: absolute;
    top: 0;
    left: 2rem;
    font-family: 'Shelby', sans-serif;
    font-size: 128px;
    line-height: 1;
    opacity: 0.1;
    z-index: -1;
  }

  h3 {
    font-size: 24px;
  }
`

const WorksWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  > section {
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
        .detail-link {
          margin: 1rem 0 0 auto;
        }
      }
      .detail-link {
        margin: 0 0 0 auto;
        clip-path: inset(0 0 0 100%);
      }
    }

    p {
      font-size: 0.9rem;
      opacity: 0.9;

      &.caption {
        opacity: 0.7;
      }
    }

    > :first-child {
      width: 40%;
      aspect-ratio: 1;
      padding: 1.2vw;
      background-color: ${ColorCode.MAIN_TEXT_COLOR};
      box-shadow: 4px 4px 12px ${rgba(ColorCode.MAIN_TEXT_COLOR, 0.2)};
      object-fit: cover;

      @media screen and (min-width: 1200px) {
        padding: 14.4px;
      }
    }
    .category-link,
    .tag-link {
      color: inherit;
      text-decoration: none;

      &:hover {
        background-color: ${ColorCode.ACCENT_COLOR};
        color: #fff;
      }
    }

    .detail-link {
      display: block;
      margin: 0 auto 0 0;
      padding: 0.5rem 1.1rem 0 1rem;
      height: 0;
      width: fit-content;
      border: 1px solid ${ColorCode.ACCENT_COLOR};
      background-color: transparent;
      color: ${ColorCode.ACCENT_COLOR};

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

      .detail-link {
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

const WorksPage: React.FC<PageProps<Queries.WorksQuery>> = ({ data }) => {
  const tags: Tag[] = data.allGraphCmsWorkTag.nodes.map((t) => new Tag(t))

  const works = data.allGraphCmsWork.nodes

  const pickUpWorks = works.filter((work) => work.pickUp)
  const otherWorks = works.filter((work) => !work.pickUp)

  const renderWorks = (works: readonly GraphCmsWork[]) =>
    works.map((work) => (
      <section>
        <img src={work.thumbnail.url} alt={work.shortDescription} />
        <section>
          <h2>{work.title}</h2>
          <p className="caption">
            <Link
              className="category-link"
              to={`/works/category/${work.category.slug}`}
            >
              {work.category.name}
            </Link>
          </p>
          <p className="caption">
            <Link className="tag-link" to={`/works/tag/${work.tags[0].slug}`}>
              {work.tags[0].name}
            </Link>{' '}
            {work.tags.slice(1).map((tag) => (
              <>
                {' '}
                /{' '}
                <Link className="tag-link" to={`/works/tag/${tag.slug}`}>
                  {tag.name}
                </Link>
              </>
            ))}
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: work.shortDescription.replace(/\n/g, '<br>'),
            }}
          ></p>
          <Link className="detail-link" to={`/works/detail/${work.slug}`}>
            Detail
          </Link>
        </section>
      </section>
    ))

  return (
    <Layout>
      <GridMain>
        <Navigation>
          <TagsToggleButton>
            <input type="checkbox" name="tags-show" id="tags" />
            <label htmlFor="tags">open tag navigation</label>
          </TagsToggleButton>
          <ul>
            {tags
              .sort((a, b) => {
                return a.count < b.count ? 1 : -1
              })
              .map((tag) => (
                <li key={tag.name}>
                  <Link to={`/works/tag/${tag.slug}`}>
                    {tag.name} <span>({tag.count})</span>
                  </Link>
                </li>
              ))}
          </ul>
        </Navigation>
        <MainContent>
          <h1>Works</h1>
          <WorksWrapper>
            {renderWorks(pickUpWorks)}
            {renderWorks(otherWorks)}
          </WorksWrapper>
        </MainContent>
      </GridMain>
    </Layout>
  )
}

export default WorksPage

export const Head: HeadFC = () => (
  <Seo title="Works" description="Works of Mhousetree" />
)

export const pageQuery = graphql`
  query Works {
    allGraphCmsWorkTag {
      nodes {
        works {
          title
        }
        name
        slug
      }
    }
    allGraphCmsWork(sort: { fields: to, order: DESC }) {
      nodes {
        title
        thumbnail {
          url
        }
        tags {
          name
          slug
        }
        category {
          name
          slug
        }
        shortDescription
        pickUp
        slug
      }
    }
  }
`

type GraphCmsTag = {
  works: readonly { title: string }[]
  name: string
  slug: string
}

class Tag {
  // properties
  name: string
  slug: string
  count: number

  // constructor
  constructor(graphCmsTag: GraphCmsTag) {
    this.name = graphCmsTag.name
    this.slug = graphCmsTag.slug
    this.count = graphCmsTag.works.length
  }
}

type GraphCmsWork = {
  title: string
  category: { name: string; slug: string }
  tags: readonly { name: string; slug: string }[]
  shortDescription: string
  pickUp: boolean
  slug: string
  thumbnail: { url: string }
}
