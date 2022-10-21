import { GatsbyNode } from 'gatsby'
import path from 'path'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type GraphCMS_History implements Node {
        from: Date!
        to: Date
        subHistories: [GraphCMS_History!]
      }
      type GraphCMS_Skill implements Node {
        from: Date!
      }
      type GraphCMS_Certification implements Node {
        date: Date!
      }
      type GraphCMS_Work implements Node {
        from: Date!
        to: Date!
        category: GraphCMS_WorkCategory!
      }
      type GraphCMS_WorkCategory implements Node {
        slug: String!
      }
    `
    createTypes(typeDefs)
  }

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const worksTemplate = path.resolve(`./src/templates/detail-work.tsx`)
  const categoryTemplate = path.resolve(
    `./src/templates/filter-category-works.tsx`
  )
  const TagTemplate = path.resolve(`./src/templates/filter-tag-works.tsx`)

  const result = await graphql<{
    allGraphCmsWork: Pick<Queries.Query['allGraphCmsWork'], 'nodes'>
    allGraphCmsWorkCategory: Pick<
      Queries.Query['allGraphCmsWorkCategory'],
      'nodes'
    >
    allGraphCmsWorkTag: Pick<Queries.Query['allGraphCmsWorkTag'], 'nodes'>
  }>(
    `
      {
        allGraphCmsWork {
          nodes {
            title
            slug
            category {
              name
            }
            from
            to
            url
            shortDescription
            tags {
              name
            }
            thumbnail {
              url
            }
            description {
              text
              image {
                url
              }
            }
          }
        }
        allGraphCmsWorkCategory {
          nodes {
            id
            name
            slug
          }
        }
        allGraphCmsWorkTag {
          nodes {
            id
            name
            slug
          }
        }
      }
    `
  )

  const works = result.data?.allGraphCmsWork
  const categories = result.data?.allGraphCmsWorkCategory
  const tags = result.data?.allGraphCmsWorkTag

  works?.nodes.forEach((node) => {
    createPage<WorkPageContext>({
      path: `/works/detail/${node.slug}`,
      component: worksTemplate,
      context: {
        workInfo: node,
      },
    })
  })

  categories?.nodes.forEach((node) => {
    createPage<CategoryPageContext>({
      path: `/works/category/${node.slug}`,
      component: categoryTemplate,
      context: {
        slug: node.slug,
        categoryInfo: node,
      },
    })
  })

  tags?.nodes.forEach((node) => {
    createPage<TagPageContext>({
      path: `/works/tag/${node.slug}`,
      component: TagTemplate,
      context: {
        slug: node.slug,
        tagInfo: node,
      },
    })
  })
}

export type WorkPageContext = {
  workInfo: Queries.GraphCMS_Work
}

export type CategoryPageContext = {
  slug: string
  categoryInfo: Queries.GraphCMS_WorkCategory
}

export type TagPageContext = {
  slug: string
  tagInfo: Queries.GraphCMS_WorkTag
}
