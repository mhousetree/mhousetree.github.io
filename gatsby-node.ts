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

  const result = await graphql<{
    allGraphCmsWork: Pick<Queries.Query['allGraphCmsWork'], 'nodes'>
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
          }
        }
      }
    `
  )

  result.data?.allGraphCmsWork.nodes.forEach((node) => {
    createPage<WorkPageContext>({
      path: `/works/detail/${node.slug}`,
      component: worksTemplate,
      context: {
        workInfo: node,
      },
    })
  })
}

export type WorkPageContext = {
  workInfo: Queries.GraphCMS_Work
}
