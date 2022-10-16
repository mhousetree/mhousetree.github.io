import * as React from 'react'
import { graphql, HeadFC, Link, PageProps } from 'gatsby'
import { rgba } from 'polished'

import { Seo } from '../components/seo'
import { Layout } from '../components/layout'
import styled from 'styled-components'

import { ColorCode } from '../constants/colors'
import { CategoryPageContext } from '../../gatsby-node'

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

// TODO: detail-worksと共通
const Header = styled.header`
  position: fixed;
  z-index: 2;
  top: 0;
  overflow: hidden;
  width: min(960px, 80%);
  border-radius: 0 0 2px 2px;
  padding: 1rem 0;
  animation: slide-appear 1s ease-out 0s 1 normal both;
  /* TODO: ぼかし上げたい */
  backdrop-filter: blur(5px);
  mask-image: linear-gradient(to bottom, #000 90%, transparent 100%);
  background-color: ${rgba(ColorCode.SUB_BG_COLOR, 0.5)};
  text-align: center;

  /* TODO: 多分消す */
  @keyframes slide-appear {
    from {
      translate: 0 -84px;
    }
    to {
      translate: 0;
    }
  }

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
  }

  a {
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
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

const FilterCategoryTemplate: React.FC<
  PageProps<Queries.FilterCategoryTemplateQuery, CategoryPageContext>
> = ({ data, pageContext }) => {
  console.log(data)
  console.log(pageContext.categoryInfo)

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
        <Header>
          <Link to="/works">
            <i className="mic-arrow-left"></i>
          </Link>
          <h1>Category: {pageContext.categoryInfo.name}</h1>
        </Header>
        <MainContent>
          <h1>
            Works
            <br />- {pageContext.categoryInfo.name}
          </h1>
          <WorksWrapper>
            {renderWorks(pickUpWorks)}
            {renderWorks(otherWorks)}
          </WorksWrapper>
        </MainContent>
      </GridMain>
    </Layout>
  )
}

export default FilterCategoryTemplate

export const Head: HeadFC = () => (
  // TODO
  <Seo title="Works" description="Works of Mhousetree" />
)

export const pageQuery = graphql`
  query FilterCategoryTemplate($slug: String!) {
    allGraphCmsWork(
      filter: { category: { slug: { eq: $slug } } }
      sort: { fields: to, order: DESC }
    ) {
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

type GraphCmsWork = {
  title: string
  category: { name: string; slug: string }
  tags: readonly { name: string; slug: string }[]
  shortDescription: string
  pickUp: boolean
  slug: string
  thumbnail: { url: string }
}
